import { NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";
import { escapeHtml } from "@/lib/escape-html";
import {
  QUOTE_ALLOWED_EXTENSIONS,
  QUOTE_MAX_FILES,
  QUOTE_MAX_TOTAL_BYTES,
  fileExtension,
  projectTypeLabelsPt,
  quoteSchema,
} from "@/lib/quote-schema";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || "",
});

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;">${escapeHtml(value)}</td>
  </tr>`;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const parsed = quoteSchema.safeParse({
      clientType: form.get("clientType"),
      name: form.get("name"),
      company: form.get("company") || undefined,
      nif: form.get("nif"),
      email: form.get("email"),
      phone: form.get("phone"),
      location: form.get("location"),
      projectType: form.get("projectType"),
      materials: form.get("materials") || undefined,
      message: form.get("message"),
      consent: form.get("consent") === "true",
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

    if (
      files.length > QUOTE_MAX_FILES ||
      totalBytes > QUOTE_MAX_TOTAL_BYTES ||
      files.some((f) => !(QUOTE_ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(f.name)))
    ) {
      return NextResponse.json({ error: "files" }, { status: 400 });
    }

    const fromEmail = process.env.CONTACT_FROM_EMAIL || "";
    const toEmail = process.env.CONTACT_TO_EMAIL || "";

    if (!process.env.BREVO_API_KEY || !fromEmail || !toEmail) {
      return NextResponse.json({ error: "config" }, { status: 500 });
    }

    const d = parsed.data;
    const projectLabel = projectTypeLabelsPt[d.projectType];
    const clientLabel = d.clientType === "empresa" ? "Empresa" : "Particular";

    const attachment = await Promise.all(
      files.map(async (f) => ({
        name: f.name.replace(/[^\w.\- ]+/g, "_"),
        content: Buffer.from(await f.arrayBuffer()).toString("base64"),
      }))
    );

    // 1) Pedido para a J. Mendes (com os anexos)
    await brevo.transactionalEmails.sendTransacEmail({
      subject: `Pedido de orçamento - ${projectLabel} - ${d.company || d.name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #111111;">
          <h2 style="margin: 0 0 24px;">Novo pedido de orçamento</h2>
          <table style="border-collapse: collapse; font-size: 15px;">
            ${row("Cliente:", clientLabel)}
            ${d.company ? row("Empresa:", d.company) : ""}
            ${row("Nome:", d.name)}
            ${row("Contribuinte:", d.nif)}
            ${row("Email:", d.email)}
            ${row("Telefone:", d.phone)}
            ${row("Local da obra:", d.location)}
            ${row("Tipo de projeto:", projectLabel)}
            ${d.materials ? row("Materiais de interesse:", d.materials) : ""}
            ${row("Anexos:", files.length ? files.map((f) => f.name).join(", ") : "Nenhum")}
          </table>
          <div style="margin-top: 24px;">
            <p><strong>Mensagem:</strong></p>
            <p style="line-height: 1.7; white-space: pre-line;">${escapeHtml(d.message)}</p>
          </div>
        </div>
      `,
      sender: { name: "Website J Mendes", email: fromEmail },
      to: [{ email: toEmail, name: "J Mendes" }],
      replyTo: { email: d.email, name: d.name },
      ...(attachment.length ? { attachment } : {}),
    });

    // 2) Confirmação para o cliente
    await brevo.transactionalEmails.sendTransacEmail({
      subject: "Recebemos o seu pedido de orçamento",
      htmlContent: `
        <div style="background-color: #f7f7f7; padding: 32px 16px;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 32px; color: #111111;">
            <div style="text-align: center; margin-bottom: 32px;">
              <img src="https://jmendes.vercel.app/logo.jpg" alt="J Mendes Mobiliário" style="max-width: 180px; height: auto;" />
            </div>
            <h1 style="font-size: 28px; line-height: 1.3; margin: 0 0 24px 0;">
              Obrigado, ${escapeHtml(d.name)}
            </h1>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 16px 0;">
              Recebemos o seu pedido de orçamento (${escapeHtml(projectLabel)}).
            </p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 32px 0;">
              Vamos analisar o projeto e entraremos em contacto consigo com a maior brevidade possível.
            </p>
            <div style="border-top: 1px solid #e5e5e5; padding-top: 24px; margin-top: 24px;">
              <p style="font-size: 16px; line-height: 1.7; margin: 0 0 8px 0;">Com os melhores cumprimentos,</p>
              <p style="font-size: 18px; font-weight: 700; margin: 0;">J Mendes Mobiliário</p>
            </div>
          </div>
        </div>
      `,
      sender: { name: "J Mendes Mobiliário", email: fromEmail },
      to: [{ email: d.email, name: d.name }],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar pedido de orçamento:", error);
    return NextResponse.json({ error: "send" }, { status: 500 });
  }
}
