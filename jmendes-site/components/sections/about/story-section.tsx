export default function StorySection() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-2">
        {/* texto */}
        <div>
          <h2 className="text-4xl mb-6">A Nossa História</h2>

          <p className="text-[var(--muted)] leading-7 mb-6">
            Fundada em 1995, a <span className="text-gold">J. Mendes Mobiliário</span> nasceu da paixão
            pela carpintaria e do compromisso com a excelência.
          </p>

          <p className="text-[var(--muted)] leading-7 mb-6">
            Começámos como uma pequena oficina artesanal e crescemos até nos tornarmos
            uma referência na indústria de mobiliário personalizado.
          </p>

          <p className="text-[var(--muted)] leading-7">
            Hoje, servimos clientes em Portugal e no estrangeiro, sempre com o mesmo
            nível de dedicação e atenção ao detalhe.
          </p>
        </div>

        {/* imagens */}
        <div className="flex gap-6">
          <img
            src="/images/sobre/story-1.jpeg"
            className="w-1/2 object-cover"
          />
          <img
            src="/images/sobre/story-2.jpg"
            className="w-1/2 object-cover mt-10"
          />
        </div>
      </div>
    </section>
  );
}
