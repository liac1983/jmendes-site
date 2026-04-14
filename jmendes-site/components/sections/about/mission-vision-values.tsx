export default function MissionVisionValues() {
  return (
    <section className="border-t border-[var(--border)] py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-3">
        
        <div>
          <h3 className="text-2xl text-gold mb-4">Missão</h3>
          <p className="text-[var(--muted)] leading-7">
            Criar mobiliário de excelência que transforme espaços e supere expectativas.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-gold mb-4">Visão</h3>
          <p className="text-[var(--muted)] leading-7">
            Ser referência europeia em mobiliário personalizado de alta qualidade.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-gold mb-4">Valores</h3>
          <p className="text-[var(--muted)] leading-7">
            Excelência, inovação e compromisso com o cliente em cada projeto.
          </p>
        </div>

      </div>
    </section>
  );
}
