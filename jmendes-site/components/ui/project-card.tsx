type ProjectCardProps = {
  image: string;
  title: string;
  categoryLabel: string;
  testimonial?: {
    text: string;
    author: string;
  };
};

export default function ProjectCard({
  image,
  title,
  categoryLabel,
  testimonial,
}: ProjectCardProps) {
  return (
    <article>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[420px] w-full object-cover"
        />

        {testimonial && (
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-5 backdrop-blur-sm">
            <p className="text-sm text-white">"{testimonial.text}"</p>
            <p className="mt-2 text-sm text-[var(--gold)]">- {testimonial.author}</p>
          </div>
        )}
      </div>

      <div className="pt-5">
        <p className="text-sm uppercase tracking-[0.18em] text-[var(--gold)]">
          {categoryLabel}
        </p>
        <h3 className="mt-2 text-3xl text-[var(--foreground)]">{title}</h3>
      </div>
    </article>
  );
}

