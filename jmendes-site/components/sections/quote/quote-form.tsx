"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Paperclip, Send, X } from "lucide-react";
import {
  QUOTE_ALLOWED_EXTENSIONS,
  QUOTE_MAX_FILES,
  QUOTE_MAX_TOTAL_BYTES,
  createQuoteSchema,
  fileExtension,
  projectTypes,
  type QuoteFormData,
} from "@/lib/quote-schema";

const fieldClass =
  "h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]";
const labelClass = "mb-3 block text-base text-white";

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Props = {
  initialMaterials?: string;
};

export default function QuoteForm({ initialMaterials = "" }: Props) {
  const t = useTranslations("Quote.form");
  const v = useTranslations("Quote.form.validation");
  const fileInput = useRef<HTMLInputElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const requestId = useRef<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const schema = createQuoteSchema({
    required: v("required"),
    invalidEmail: v("invalidEmail"),
    invalidNif: v("invalidNif"),
    messageTooShort: v("messageTooShort"),
    consentRequired: v("consentRequired"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(schema),
    defaultValues: { clientType: "particular", materials: initialMaterials },
  });

  const clientType = watch("clientType");

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (!(QUOTE_ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(file.name))) {
        setFileError(t("files.wrongType"));
        continue;
      }
      if (!next.some((f) => f.name === file.name && f.size === file.size)) next.push(file);
    }
    const total = next.reduce((sum, f) => sum + f.size, 0);
    if (next.length > QUOTE_MAX_FILES) {
      setFileError(t("files.tooMany", { max: QUOTE_MAX_FILES }));
      return;
    }
    if (total > QUOTE_MAX_TOTAL_BYTES) {
      setFileError(t("files.tooBig"));
      return;
    }
    setFileError("");
    setFiles(next);
    if (fileInput.current) fileInput.current.value = "";
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setServerError("");
    setIsSuccess(false);

    const body = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) body.append(key, String(value));
    }
    files.forEach((file) => body.append("files", file));
    // Mantém-se entre tentativas e muda depois de um envio com sucesso.
    requestId.current ??= crypto.randomUUID();
    body.append("requestId", requestId.current);
    body.append("extra_info", honeypot.current?.value ?? "");

    try {
      const response = await fetch("/api/quote", { method: "POST", body });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(["files", "rate"].includes(payload.error) ? payload.error : "send");
      }
      setIsSuccess(true);
      requestId.current = null;
      setFiles([]);
      reset({ clientType: "particular", materials: "" });
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      setServerError(
        code === "files" ? t("files.tooBig") : code === "rate" ? t("tooMany") : t("error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-[var(--border)] p-8 md:p-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
        {/* Armadilha para robôs: fora do ecrã, do teclado e dos leitores de ecrã. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input ref={honeypot} type="text" name="extra_info" tabIndex={-1} autoComplete="off" />
        </div>

        {/* 1. Quem pede */}
        <fieldset className="space-y-6">
          <legend className="mb-6 text-2xl text-gold">{t("steps.client")}</legend>

          <div className="flex flex-wrap gap-4">
            {(["particular", "empresa"] as const).map((type) => (
              <label
                key={type}
                className={`flex h-[52px] cursor-pointer items-center gap-3 border px-6 transition-colors ${
                  clientType === type
                    ? "border-[var(--gold)] text-white"
                    : "border-[var(--border)] text-[var(--muted)] hover:text-white"
                }`}
              >
                <input type="radio" value={type} {...register("clientType")} className="accent-[var(--gold)]" />
                {t(`clientTypes.${type}`)}
              </label>
            ))}
          </div>

          {clientType === "empresa" && (
            <div>
              <label className={labelClass}>{t("labels.company")} *</label>
              <input {...register("company")} className={fieldClass} autoComplete="organization" />
              {errors.company && <p className="mt-2 text-sm text-red-400">{errors.company.message}</p>}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>{t("labels.name")} *</label>
              <input {...register("name")} maxLength={100} className={fieldClass} autoComplete="name" />
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>{t("labels.nif")} *</label>
              <input {...register("nif")} className={fieldClass} inputMode="text" />
              {errors.nif && <p className="mt-2 text-sm text-red-400">{errors.nif.message}</p>}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>{t("labels.email")} *</label>
              <input {...register("email")} type="email" className={fieldClass} autoComplete="email" />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>{t("labels.phone")} *</label>
              <input {...register("phone")} type="tel" className={fieldClass} autoComplete="tel" />
              {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* 2. O projeto */}
        <fieldset className="space-y-6">
          <legend className="mb-6 text-2xl text-gold">{t("steps.project")}</legend>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className={labelClass}>{t("labels.projectType")} *</label>
              <select {...register("projectType")} className={fieldClass} defaultValue="">
                <option value="" className="bg-black text-white">
                  {t("projectTypePlaceholder")}
                </option>
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-black text-white">
                    {t(`projectTypes.${type}`)}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-2 text-sm text-red-400">{errors.projectType.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>{t("labels.location")} *</label>
              <input {...register("location")} className={fieldClass} placeholder={t("locationPlaceholder")} />
              {errors.location && <p className="mt-2 text-sm text-red-400">{errors.location.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>{t("labels.message")} *</label>
            <textarea
              {...register("message")}
              rows={7}
              placeholder={t("messagePlaceholder")}
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-[var(--gold)]"
            />
            {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
          </div>

          <div>
            <label className={labelClass}>{t("labels.materials")}</label>
            <textarea
              {...register("materials")}
              rows={2}
              placeholder={t("materialsPlaceholder")}
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-[var(--gold)]"
            />
          </div>

          {/* Anexos */}
          <div>
            <label className={labelClass}>{t("labels.files")}</label>
            <p className="mb-4 text-sm text-[var(--muted)]">{t("files.help", { max: QUOTE_MAX_FILES })}</p>
            <input
              ref={fileInput}
              type="file"
              multiple
              accept={QUOTE_ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
              onChange={(e) => addFiles(e.target.files)}
              className="hidden"
              id="quote-files"
            />
            <label
              htmlFor="quote-files"
              className="inline-flex h-[52px] cursor-pointer items-center gap-3 border border-[var(--border)] px-6 text-white transition-colors hover:border-[var(--gold)]"
            >
              <Paperclip className="h-5 w-5 text-[var(--gold)]" />
              {t("files.add")}
            </label>

            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((file) => (
                  <li
                    key={`${file.name}-${file.size}`}
                    className="flex items-center justify-between gap-4 border border-[var(--border)] px-4 py-3 text-sm text-white"
                  >
                    <span className="truncate">
                      {file.name} <span className="text-[var(--muted)]">· {formatSize(file.size)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((f) => f !== file))}
                      aria-label={t("files.remove")}
                      className="text-[var(--muted)] hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {fileError && <p className="mt-2 text-sm text-red-400">{fileError}</p>}
          </div>
        </fieldset>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-[var(--muted)]">
            <input type="checkbox" {...register("consent")} className="mt-1 accent-[var(--gold)]" />
            <span>{t("consent")}</span>
          </label>
          {errors.consent && <p className="mt-2 text-sm text-red-400">{errors.consent.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}
        {isSuccess && <p className="text-sm text-green-400">{t("success")}</p>}

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
