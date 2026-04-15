import Container from "@/components/ui/container";

export default function ContactMap() {
  return (
    <section className="border-t border-[var(--border)] py-20 lg:py-24">
      <Container>
        <h2 className="text-5xl text-white">Localização</h2>

        <div className="mt-10 h-[520px] overflow-hidden border border-[var(--border)]">
          <iframe
            src="https://www.google.com/maps?q=Pa%C3%A7os%20de%20Ferreira&z=13&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert-[92%] contrast-125 brightness-90"
          />
        </div>
      </Container>
    </section>
  );
}
