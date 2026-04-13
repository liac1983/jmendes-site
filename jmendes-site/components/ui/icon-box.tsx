import { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  className?: string;
};

export default function IconBox({ icon: Icon, className }: IconBoxProps) {
  return (
    <div
      className={`flex h-16 w-16 items-center justify-center border border-[var(--gold)] text-[var(--gold)] ${className || ""}`}
    >
      <Icon className="h-6 w-6" />
    </div>
  );
}
