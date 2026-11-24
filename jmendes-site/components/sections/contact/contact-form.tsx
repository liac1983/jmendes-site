"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactSchema, type ContactFormData } from "@/lib/contact-schema";

export default function ContactForm() {
  const t = useTranslations("Contact.form");
  const validationT = useTranslations("Contact.form.validation");
  const honeypot = useRef<HTMLInputElement>(null);
  const requestId = useRef<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const contactSchema = createContactSchema({
    nameRequired: validationT("nameRequired"),
    invalidEmail: validationT("invalidEmail"),
    subjectRequired: validationT("subjectRequired"),
    messageTooShort: validationT("messageTooShort"),
  });
  const subjectOptions = [
    { value: "mobiliario-medida", label: t("subjects.customFurniture") },
    { value: "design-interiores", label: t("subjects.interiorDesign") },
    { value: "visualizacao-3d", label: t("subjects.visualization3d") },
    { value: "producao-industrial", label: t("subjects.industrialProduction") },
    { value: "entrega-montagem", label: t("subjects.deliveryAssembly") },
    { value: "outro", label: t("subjects.other") },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError("");
    setIsSuccess(false);

    // Mantém-se entre tentativas e muda depois de um envio com sucesso.
    requestId.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          requestId: requestId.current,
          extra_info: honeypot.current?.value ?? "",
        }),
      });

      if (!response.ok) {
        throw new Error(response.status === 429 ? "rate" : "send");
      }

      setIsSuccess(true);
      requestId.current = null;
      reset();
    } catch (error) {
      const tooMany = error instanceof Error && error.message === "rate";
      setServerError(tooMany ? t("tooMany") : t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-[var(--border)] p-8 md:p-12">
      <h2 className="text-5xl text-white">{t("title")}</h2>
      <p className="mt-4 text-lg text-[var(--muted)]">
        {t("subtitle")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
        {/* Armadilha para robôs: fora do ecrã, do teclado e dos leitores de ecrã. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input ref={honeypot} type="text" name="extra_info" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-base text-white">
              {t("labels.name")} *
            </label>
            <input
              {...register("name")}
              maxLength={100}
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-3 block text-base text-white">
              {t("labels.email")} *
            </label>
            <input
              {...register("email")}
              type="email"
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-base text-white">
              {t("labels.phone")}
            </label>
            <input
              {...register("phone")}
              maxLength={40}
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div>
            <label className="mb-3 block text-base text-white">
              {t("labels.subject")} *
            </label>
            <select
              {...register("subject")}
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
              defaultValue=""
            >
              <option value="" className="bg-black text-white">
                {t("subjectPlaceholder")}
              </option>
              {subjectOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-black text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-base text-white">
            {t("labels.message")} *
          </label>
          <textarea
            {...register("message")}
            rows={7}
            placeholder={t("messagePlaceholder")}
            className="w-full border border-[var(--border)] bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-[var(--gold)]"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}
        {isSuccess && (
          <p className="text-sm text-green-400">
            {t("success")}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[62px] items-center gap-3 bg-[var(--gold)] px-8 text-lg font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
