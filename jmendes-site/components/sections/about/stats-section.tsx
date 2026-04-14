import { stats } from "@/data/stats";

export default function StatsSection() {
  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-6 text-center md:grid-cols-4">
        {stats.map((item, i) => (
          <div key={i}>
            <p className="text-4xl text-gold">{item.value}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
