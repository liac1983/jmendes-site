export default function HomePage() {
  return (
    <section className="min-h-screen bg-[var(--background)] px-6 py-24">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-6xl leading-none text-white">
          Fabricamos mobiliário com{" "}
          <span className="text-gold">excelência</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          Desde 1995 a criar soluções únicas em mobiliário.
        </p>
      </div>
    </section>
  );
}