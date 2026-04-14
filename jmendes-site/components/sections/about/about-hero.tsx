import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="/images/sobre/hero.jpg"
        alt="Sobre nós"
        fill
        className="object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* conteúdo */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div>
          <h1 className="text-5xl md:text-7xl">Sobre Nós</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Três décadas de experiência em mobiliário de excelência
          </p>
        </div>
      </div>
    </section>
  );
}
