import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem demasiado curta"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
