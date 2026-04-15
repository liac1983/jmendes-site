"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      setIsSuccess(true);
      reset();
    } catch {
      setServerError("Não foi possível enviar a mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-[var(--border)] p-8 md:p-12">
      <h2 className="text-5xl text-white">Pedir Orçamento</h2>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Preencha o formulário e entraremos em contacto em breve
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-base text-white">Nome *</label>
            <input
              {...register("name")}
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-3 block text-base text-white">Email *</label>
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
            <label className="mb-3 block text-base text-white">Telefone</label>
            <input
              {...register("phone")}
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div>
            <label className="mb-3 block text-base text-white">Assunto *</label>
            <select
              {...register("subject")}
              className="h-[56px] w-full border border-[var(--border)] bg-transparent px-4 text-white outline-none focus:border-[var(--gold)]"
              defaultValue=""
            >
              <option value="" className="bg-black text-white">
                Selecione...
              </option>
              <option value="mobiliario-medida" className="bg-black text-white">
                Mobiliário por Medida
              </option>
              <option value="design-interiores" className="bg-black text-white">
                Design de Interiores
              </option>
              <option value="visualizacao-3d" className="bg-black text-white">
                Visualização 3D
              </option>
              <option value="producao-industrial" className="bg-black text-white">
                Produção Industrial
              </option>
              <option value="entrega-montagem" className="bg-black text-white">
                Entrega e Montagem
              </option>
              <option value="outro" className="bg-black text-white">
                Outro
              </option>
            </select>
            {errors.subject && (
              <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-3 block text-base text-white">Mensagem *</label>
          <textarea
            {...register("message")}
            rows={7}
            placeholder="Descreva o seu projeto..."
            className="w-full border border-[var(--border)] bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-[var(--gold)]"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}
        {isSuccess && (
          <p className="text-sm text-green-400">
            Mensagem enviada com sucesso.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[62px] items-center gap-3 bg-[var(--gold)] px-8 text-lg font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
          {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
}

