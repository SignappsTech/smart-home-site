import { homeContent } from "@/content/home";
import { Quote } from "@/components/icons";

export type TestimonialsProps = typeof homeContent.testimonials;

export function Testimonials(props: Partial<TestimonialsProps> = {}) {
  const t = { ...homeContent.testimonials, ...props };

  // Honesty rule: only show quotes that are real (placeholder flag removed).
  // Until then, show the honest empty note — never a fabricated testimonial.
  const real = t.items.filter((i) => !("placeholder" in i && i.placeholder));

  return (
    <section id="mnenja" className="section bg-ink-900/40">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-mist-300">{t.subtitle}</p>
        </div>

        {real.length > 0 ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {real.map((item) => (
              <figure key={item.author + item.quote} className="card flex h-full flex-col">
                <Quote className="h-6 w-6 text-brand-300" aria-hidden />
                <blockquote className="mt-4 flex-1 leading-relaxed text-mist-200">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-white">{item.author}</span>
                  <span className="text-mist-400"> · {item.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-8 text-center leading-relaxed text-mist-300">
            {t.emptyNote}
          </p>
        )}
      </div>
    </section>
  );
}
