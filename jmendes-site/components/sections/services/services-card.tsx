import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import Reveal, { ImageReveal } from "@/components/ui/reveal";

type ServiceCardProps = {
  title: string;
  image: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  delay?: number;
};

export default function ServiceCard({
  title,
  image,
  description,
  bullets,
  icon: Icon,
  delay = 0,
}: ServiceCardProps) {
  return (
    <Reveal delay={delay} className="h-full" duration={0.95}>
      <div className="group h-full">
        {/* imagem */}
        <ImageReveal className="h-[260px] w-full" delay={delay}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />

          {/* overlay escuro */}
          <div className="absolute inset-0 z-10 bg-black/40 transition-colors duration-[900ms] ease-out group-hover:bg-black/25" />

          {/* icon box */}
          <div className="absolute bottom-4 left-4 z-20 flex h-12 w-12 items-center justify-center border border-[var(--gold)] bg-black/20 text-[var(--gold)] backdrop-blur-sm transition duration-[900ms] ease-out group-hover:-translate-y-1 group-hover:bg-[var(--gold)] group-hover:text-black">
            <Icon className="h-5 w-5" />
          </div>
        </ImageReveal>

        {/* conteúdo */}
        <div className="mt-6 transition-transform duration-[900ms] ease-out group-hover:-translate-y-1">
          <h3 className="text-2xl text-white transition-colors duration-500 ease-out group-hover:text-[var(--gold)]">
            {title}
          </h3>

          <p className="mt-3 text-[var(--muted)] leading-7">
            {description}
          </p>

          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 transition-colors duration-500 ease-out hover:text-white"
              >
                <span className="text-[var(--gold)]">-</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
