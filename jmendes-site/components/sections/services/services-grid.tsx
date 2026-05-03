import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import { services } from "@/data/services";
import ServiceCard from "./services-card";

export default function ServicesGrid() {
  const t = useTranslations("Services.items");

  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const title = t(`${service.id}.title`);

            return (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={title}
                description={t(`${service.id}.description`)}
                bullets={service.bulletKeys.map((bulletKey) =>
                  t(`${service.id}.bullets.${bulletKey}`)
                )}
                icon={service.icon}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
