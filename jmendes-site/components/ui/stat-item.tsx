type StatItemProps = {
  value: string;
  label: string;
};

export default function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <p className="text-5xl font-medium text-[var(--gold)] md:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-lg text-[var(--muted)]">{label}</p>
    </div>
  );
}
