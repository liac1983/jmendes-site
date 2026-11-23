import { z } from "zod";

export const projectTypes = [
  "kitchen",
  "bedroom",
  "wardrobe",
  "bathroom",
  "laundry",
  "living",
  "fullHouse",
  "commercial",
  "other",
] as const;

export const projectTypeLabelsPt: Record<(typeof projectTypes)[number], string> = {
  kitchen: "Cozinha",
  bedroom: "Quarto",
  wardrobe: "Roupeiro / closet",
  bathroom: "Casa de banho",
  laundry: "Lavandaria",
  living: "Sala",
  fullHouse: "Casa completa",
  commercial: "Restauração, hotelaria ou comércio",
  other: "Outro",
};

// Anexos: limite total de 4 MB (a Vercel não aceita pedidos acima de 4,5 MB).
export const QUOTE_MAX_FILES = 5;
export const QUOTE_MAX_TOTAL_BYTES = 4 * 1024 * 1024;
export const QUOTE_ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "zip"] as const;

export function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

const defaultMessages = {
  required: "Campo obrigatório",
  invalidEmail: "Email inválido",
  invalidNif: "Contribuinte inválido",
  messageTooShort: "Descreva um pouco mais o projeto",
  consentRequired: "É preciso aceitar para enviarmos o orçamento",
};

export type QuoteValidationMessages = typeof defaultMessages;

export function createQuoteSchema(messages: QuoteValidationMessages = defaultMessages) {
  return z
    .object({
      clientType: z.enum(["particular", "empresa"]),
      name: z.string().trim().min(2, messages.required).max(100),
      company: z.string().trim().optional(),
      nif: z
        .string()
        .trim()
        .regex(/^[A-Za-z]{0,2}\s?[0-9A-Za-z]{5,15}$/, messages.invalidNif),
      email: z.string().trim().email(messages.invalidEmail),
      phone: z.string().trim().min(6, messages.required),
      location: z.string().trim().min(2, messages.required),
      projectType: z.enum(projectTypes, { message: messages.required }),
      materials: z.string().trim().max(1000).optional(),
      message: z.string().trim().min(10, messages.messageTooShort).max(5000),
      consent: z.literal(true, { message: messages.consentRequired }),
    })
    .refine((d) => d.clientType !== "empresa" || (d.company?.length ?? 0) >= 2, {
      path: ["company"],
      message: messages.required,
    });
}

export const quoteSchema = createQuoteSchema();
export type QuoteFormData = z.infer<typeof quoteSchema>;
