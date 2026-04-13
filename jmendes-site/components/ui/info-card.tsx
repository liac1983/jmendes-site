import { LucideIcon } from "lucide-react";
import IconBox from "./icon-box";

type InfoCardProps = {
  image: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items?: string[];
};

export default function InfoCard({
  image,
  title,
  description,
  icon,
  items = [],
}: InfoCardProps) {
  return (
    <div>
      <div className="relative mb-6 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[320px] w-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <IconBox icon={icon} />
        </div>
      </div>

      <h3 className="text-3xl text-[var(--foreground)]">{title}</h3>
      <p className="mt-4 text-lg text-[var(--muted)]">{description}</p>

      {items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[var(--muted)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--gold)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
