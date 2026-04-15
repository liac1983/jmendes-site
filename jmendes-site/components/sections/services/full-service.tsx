import Container from "@/components/ui/container";
import { PenTool, Factory, Sparkles } from "lucide-react";

const items = [
  {
    icon: PenTool,
    title: "Projetos Personalizados",
    lines: ["Mobiliário por medida", "Design de interiores", "Visualização 3D"],
  },
  {
    icon: Factory,
    title: "Produção",
    lines: ["Fabrico em série", "Capacidade industrial", "Controlo de qualidade"],
  },
  {
    icon: Sparkles,
    title: "Instalação",
    lines: ["Montagem profissional", "Embasamento", "Acabamentos finais"],
  },
];

export default function FullService() {
  return (
    <section className="border-t border-[var(--border)] py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl text-white">Serviço Completo</h2>

          <p className="mt-4 text-[var(--muted)]">
            Desde a primeira reunião até à instalação final
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 text-center">
          {items.map((item) => (
            <div key={item.title}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[var(--gold)] text-[var(--gold)]">
                <item.icon />
              </div>

              <h3 className="mt-6 text-xl text-white">{item.title}</h3>

              <div className="mt-3 text-sm text-[var(--muted)] space-y-1">
                {item.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
