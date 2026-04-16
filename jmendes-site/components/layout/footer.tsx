import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

type Props = {
  locale: string;
};

export default function Footer({ locale }: Props) {
  return (
    <footer className="border-t border-[var(--border)] bg-black">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <img
              src="/images/logo/logo.jpg"
              alt="J. Mendes Mobiliário"
              className="mb-6 h-14 w-auto object-contain"
            />
            <p className="max-w-xs text-sm leading-7 text-[var(--muted)]">
              Fabricamos mobiliário com precisão, design e excelência desde 1995.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-6 text-3xl text-gold">Links Rápidos</h3>
            <div className="flex flex-col gap-3">
              <Link href={`/${locale}/sobre`} className="text-white/80 hover:text-gold">
                Sobre Nós
              </Link>
              <Link href={`/${locale}/processo`} className="text-white/80 hover:text-gold">
                Processo
              </Link>
              <Link href={`/${locale}/portfolio`} className="text-white/80 hover:text-gold">
                Portfolio
              </Link>
              <Link href={`/${locale}/servicos`} className="text-white/80 hover:text-gold">
                Serviços
              </Link>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="mb-6 text-3xl text-gold">Serviços</h3>
            <div className="flex flex-col gap-3 text-white/80">
              <p>Mobiliário por Medida</p>
              <p>Projetos 3D</p>
              <p>Produção em Série</p>
              <p>Entrega e Montagem</p>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-6 text-3xl text-gold">Contacto</h3>
            <div className="space-y-4 text-white/80">
              
              {/* Telefones */}
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-gold" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+351255873030" className="hover:text-gold">
                    +351 255 873 030
                  </a>
                  <a href="tel:+351933085707" className="hover:text-gold">
                    +351 933 085 707
                  </a>
                  <a href="tel:+351914332572" className="hover:text-gold">
                    +351 914 332 572
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-gold" />
                <a
                  href="mailto:geral@jaimemendes.com"
                  className="hover:text-gold"
                >
                  geral@jaimemendes.com
                </a>
              </div>

              {/* Morada */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-gold" />
                <div className="flex flex-col">
                  <span>Praça 20 de maio, 39</span>
                  <span>4590-182 Paços de Ferreira</span>
                </div>
              </div>

              {/* Redes sociais */}
              <div className="flex gap-4 pt-2">
                
                <a
                  href="https://www.facebook.com/jmendes.mobiliario.9/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-gold"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-5 w-5" />
                </a>

                <a
                  href="https://www.instagram.com/jmendesmobiliario/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-gold"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>

                <a
                  href="https://www.tiktok.com/@jmendes.mobiliario"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-gold"
                  aria-label="TikTok"
                >
                  <FaTiktok className="h-5 w-5" />
                </a>

              </div>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[var(--border)] pt-8 text-center text-sm text-white/60">
          © 2026 J. Mendes Mobiliário. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

