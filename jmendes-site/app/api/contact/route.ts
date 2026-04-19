import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = parsed.data;

    await brevo.transactionalEmails.sendTransacEmail({
      subject: `Novo contacto - ${subject}`,
      htmlContent: `
        <h2>Novo pedido de contacto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "Não indicado"}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong><br>${message}</p>
      `,
      sender: {
        name: "Website J Mendes",
        email: process.env.CONTACT_FROM_EMAIL || "",
      },
      to: [
        {
          email: process.env.CONTACT_TO_EMAIL || "",
          name: "J Mendes",
        },
      ],
      replyTo: {
        email,
        name,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);

    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}