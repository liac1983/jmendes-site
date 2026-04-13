import { LucideIcon } from "lucide-react";
import IconBox from "./icon-box";

type ContactInfoItemProps = {
  icon: LucideIcon;
  title: string;
  lines: string[];
};

export default function ContactInfoItem({
  icon,
  title,
  lines,
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <IconBox icon={icon} className="h-14 w-14 shrink-0" />

      <div>
        <h3 className="text-3xl text-[var(--foreground)]">{title}</h3>
        <div className="mt-2 space-y-1">
          {lines.map((line) => (
            <p key={line} className="text-[var(--muted)]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
