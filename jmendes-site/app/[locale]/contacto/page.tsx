import Container from "@/components/ui/container";
import ContactHero from "@/components/sections/contact/contact-hero";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactMap from "@/components/sections/contact/contact-map";

export default function ContactoPage() {
  return (
    <main>
      <ContactHero />

      <section className="border-b border-[var(--border)] py-20 lg:py-24">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>

      <ContactMap />
    </main>
  );
}
