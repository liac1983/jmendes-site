import Container from "@/components/ui/container";
import { services } from "@/data/services";
import ServiceCard from "./services-card";

export default function ServicesGrid() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
