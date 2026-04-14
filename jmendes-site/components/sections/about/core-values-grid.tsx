import { Award, Users, Cpu, Target } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excelência",
    desc: "Compromisso com a mais alta qualidade",
  },
  {
    icon: Users,
    title: "Equipa Especializada",
    desc: "Profissionais experientes",
  },
  {
    icon: Cpu,
    title: "Tecnologia Avançada",
    desc: "Equipamento de última geração",
  },
  {
    icon: Target,
    title: "Foco no Cliente",
    desc: "Soluções personalizadas",
  },
];

export default function CoreValuesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-4">
        {values.map((item, i) => {
          const Icon = item.icon;

          return (
            <div key={i} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[var(--gold)]">
                <Icon className="h-6 w-6 text-gold" />
              </div>

              <h4 className="mb-2 text-xl">{item.title}</h4>
              <p className="text-sm text-[var(--muted)]">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
