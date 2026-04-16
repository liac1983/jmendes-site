import Container from "@/components/ui/container";
import ContactInfoItem from "@/components/ui/contact-info-item";
import { Clock3, Mail, MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-5xl text-white">Informações</h2>
      </div>

      <ContactInfoItem
        icon={Phone}
        title="Telefone"
        lines={[
          "+351 255 873 030",
          "+351 933 085 707",
          "+351 914 332 572",
        ]}
      />

      <ContactInfoItem
        icon={Mail}
        title="Email"
        lines={["geral@jaimemendes.com"]}
      />

      <ContactInfoItem
        icon={MapPin}
        title="Morada"
        lines={[
          "Praça 20 de maio, 39",
          "4590-182 Paços de Ferreira",
        ]}
      />

      <ContactInfoItem
        icon={Clock3}
        title="Horário"
        lines={[
          "Segunda a Sexta: 8h - 12h",
          "13:30h - 17:30h",
          "Sábado e Domingo: Encerrado",
        ]}
      />

      <div className="border-t border-[var(--border)] pt-10">
        <h3 className="text-3xl text-white">WhatsApp</h3>

        <a
          href="https://wa.me/351255873030"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-[60px] items-center gap-3 bg-[var(--gold)] px-8 text-lg font-medium text-black transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-5 w-5" />
          Contactar via WhatsApp
        </a>
      </div>
    </div>
  );
}
