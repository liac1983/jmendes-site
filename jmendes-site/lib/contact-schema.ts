import { z } from "zod";

const defaultValidationMessages = {
  nameRequired: "Nome obrigatório",
  invalidEmail: "Email inválido",
  subjectRequired: "Selecione um assunto",
  messageTooShort: "Mensagem demasiado curta",
};

type ContactValidationMessages = typeof defaultValidationMessages;

export function createContactSchema(
  messages: ContactValidationMessages = defaultValidationMessages
) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired).max(100),
    email: z.string().email(messages.invalidEmail),
    phone: z.string().max(40).optional(),
    subject: z.string().min(1, messages.subjectRequired),
    message: z.string().trim().min(10, messages.messageTooShort).max(5000),
  });
}

export const contactSchema = createContactSchema();

export type ContactFormData = z.infer<typeof contactSchema>;
