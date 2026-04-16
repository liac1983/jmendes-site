import { LucideIcon } from "lucide-react";

type ContactInfoItemProps = {
  icon: LucideIcon;
  title: string;
  lines: string[];
};

export default function ContactInfoItem({
  icon: Icon,
  title,
  lines,
}: ContactInfoItemProps) {
  return (
    <div className="flex gap-6 border-b border-[var(--border)] pb-8">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center border border-[var(--border)]">
        <Icon className="h-5 w-5 text-[var(--gold)]" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-2xl text-white">{title}</h3>

        <div className="mt-3 space-y-2">
          {lines.map((line, index) => (
            <p key={`${title}-${index}`} className="text-[var(--muted)]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}