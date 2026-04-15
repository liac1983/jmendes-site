import Image from "next/image";
import type { Service } from "@/data/services";

export default function ServiceCard({
  title,
  image,
  description,
  bullets,
  icon: Icon,
}: Service) {
  return (
    <div>
      {/* imagem */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />

        {/* overlay escuro */}
        <div className="absolute inset-0 bg-black/40" />

        {/* icon box */}
        <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center border border-[var(--gold)] text-[var(--gold)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* conteúdo */}
      <div className="mt-6">
        <h3 className="text-2xl text-white">{title}</h3>

        <p className="mt-3 text-[var(--muted)] leading-7">
          {description}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-[var(--gold)]">▪</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
