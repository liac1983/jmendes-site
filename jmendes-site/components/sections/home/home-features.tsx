import Container from "@/components/ui/container";
import IconBox from "@/components/ui/icon-box";
import { homeFeatures } from "@/data/home";

export default function HomeFeatures() {
  return (
    <section className="border-b border-[var(--border)] py-16 lg:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {homeFeatures.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mb-8 flex justify-center">
                <IconBox icon={feature.icon} />
              </div>

              <h3 className="text-[42px] leading-none text-[var(--foreground)] md:text-[32px]">
                {feature.title}
              </h3>

              <p className="mx-auto mt-4 max-w-[260px] text-lg leading-8 text-[var(--muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
