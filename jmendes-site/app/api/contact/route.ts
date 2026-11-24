import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { BrevoClient } from "@getbrevo/brevo";
import { escapeHtml } from "@/lib/escape-html";
import { allowRequest, clientIp, markSent, wasSent } from "@/lib/form-guard";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || "",
});

function getSubjectLabel(subject: string) {
  switch (subject) {
    case "mobiliario-medida":
      return "Mobiliário por Medida";
    case "design-interiores":
      return "Design de Interiores";
    case "visualizacao-3d":
      return "Visualização 3D";
    case "producao-industrial":
      return "Produção Industrial";
    case "entrega-montagem":
      return "Entrega e Montagem";
    default:
      return "Outro";
  }
}

export async function POST(request: Request) {
  try {
    // Logótipo servido pelo próprio site, no endereço onde o formulário foi enviado.
    const logoUrl = `${new URL(request.url).origin}/logo.jpg`;
    const body = await request.json();

    // Campo escondido: uma pessoa não o vê, por isso só um robô o preenche.
    if (body?.extra_info) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;
    const subjectLabel = getSubjectLabel(subject);

    const fromEmail = process.env.CONTACT_FROM_EMAIL || "";
    const toEmail = process.env.CONTACT_TO_EMAIL || "";

    if (!process.env.BREVO_API_KEY || !fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Faltam variáveis de ambiente do email" },
        { status: 500 }
      );
    }

    // A mesma mensagem repetida (por exemplo, por falha de rede) não é enviada outra vez.
    const rawId = typeof body.requestId === "string" ? body.requestId.slice(0, 64) : "";
    const requestId = rawId && `contacto:${rawId}`;
    if (requestId && wasSent(requestId)) {
      return NextResponse.json({ success: true });
    }

    if (
      !allowRequest(`contacto-ip:${clientIp(request)}`, 5, 10 * 60 * 1000) ||
      !allowRequest(`contacto-email:${email.toLowerCase()}`, 3, 60 * 60 * 1000)
    ) {
      return NextResponse.json({ error: "rate" }, { status: 429 });
    }

    // 1) Email para a loja
    await brevo.transactionalEmails.sendTransacEmail({
      subject: `Novo pedido de contacto - ${subjectLabel}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #111111;">
          <h2 style="margin-bottom: 24px;">Novo pedido de contacto</h2>

          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefone:</strong> ${escapeHtml(phone || "Não indicado")}</p>
          <p><strong>Assunto:</strong> ${subjectLabel}</p>

          <div style="margin-top: 24px;">
            <p><strong>Mensagem:</strong></p>
            <p style="line-height: 1.7; white-space: pre-line;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
      sender: {
        name: "Website J Mendes",
        email: fromEmail,
      },
      to: [
        {
          email: toEmail,
          name: "J Mendes",
        },
      ],
      replyTo: {
        email,
        name,
      },
    });

    if (requestId) markSent(requestId);

    // 2) Confirmação ao cliente com logótipo. Se falhar, a mensagem já chegou à
    // J. Mendes: não se mostra erro, para o cliente não a enviar outra vez.
    try {
      await brevo.transactionalEmails.sendTransacEmail({
        subject: "Recebemos o seu pedido de contacto",
        htmlContent: `
          <div style="background-color: #f7f7f7; padding: 32px 16px;">
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 32px; color: #111111;">

              <div style="text-align: center; margin-bottom: 32px;">
                <img 
                  src="${logoUrl}" 
                  alt="J Mendes Mobiliário"
                  style="max-width: 180px; height: auto;"
                />
              </div>

              <h1 style="font-size: 30px; line-height: 1.3; margin: 0 0 24px 0;">
                Obrigado pelo seu contacto, ${escapeHtml(name)}
              </h1>

              <p style="font-size: 18px; line-height: 1.7; margin: 0 0 16px 0;">
                Recebemos o seu pedido com sucesso.
              </p>

              <p style="font-size: 18px; line-height: 1.7; margin: 0 0 16px 0;">
                <strong>Assunto:</strong> ${subjectLabel}
              </p>

              <p style="font-size: 18px; line-height: 1.7; margin: 0 0 32px 0;">
                Entraremos em contacto consigo com a maior brevidade possível.
              </p>

              <div style="border-top: 1px solid #e5e5e5; padding-top: 24px; margin-top: 24px;">
                <p style="font-size: 16px; line-height: 1.7; margin: 0 0 8px 0;">
                  Com os melhores cumprimentos,
                </p>
                <p style="font-size: 18px; font-weight: 700; margin: 0;">
                  J Mendes Mobiliário
                </p>
              </div>

            </div>
          </div>
        `,
        sender: {
          name: "J Mendes Mobiliário",
          email: fromEmail,
        },
        to: [
          {
            email,
            name,
          },
        ],
      });
    } catch (error) {
      console.error("Mensagem recebida, mas a confirmação ao cliente falhou:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar emails:", error);

    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}