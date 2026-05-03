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
    name: z.string().min(2, messages.nameRequired),
    email: z.string().email(messages.invalidEmail),
    phone: z.string().optional(),
    subject: z.string().min(1, messages.subjectRequired),
    message: z.string().min(10, messages.messageTooShort),
  });
}

export const contactSchema = createContactSchema();

export type ContactFormData = z.infer<typeof contactSchema>;
