import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, Star } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import CTASection from "@/components/CTASection";

import howImg1 from "@/assets/01.jpg";
import howImg2 from "@/assets/2.jpg";
import howImg3 from "@/assets/02.jpg";

type Story = {
  title: string;
  metricTop: string;
  metricBottom: string;
  cta: string;
  img: string;
};

type Testimonial = {
  name: string;
  title: string;
  rating: number;
  text: string;
  date: string;
  specialization: string;
  companySize?: string;
};

type SortKey = "most_recent" | "highest_rating";

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "w-4 h-4",
            i < full ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
          ].join(" ")}
        />
      ))}
      <div className="ml-2 text-sm text-foreground">{full}/5</div>
    </div>
  );
}

function PhotoCard({ src }: { src: string }) {
  return (
    <div className="absolute inset-0">
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
    </div>
  );
}

function UpworkStoryCard({ story }: { story: Story }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] h-[420px] md:h-[460px] border border-border/30 shadow-soft">
      <PhotoCard src={story.img} />

      <div className="relative z-10 h-full p-8 flex flex-col justify-end">
        <div className="text-white text-2xl md:text-3xl font-semibold leading-tight">
          {story.title}
        </div>

        <div className="mt-4 text-white/85 text-sm md:text-base">
          {story.metricTop}
        </div>

        <div className="mt-4 border-t border-white/30 pt-4 text-white/90 text-sm">
          {story.metricBottom}
        </div>

        <div className="mt-6">
          <Button asChild className="rounded-full px-6">
            <Link to="/categories">{story.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/** ✅ See more / Show less для Specialization */
function SpecializationFilter({
  testimonials,
  specializations,
  specSelected,
  setSpecSelected,
  toggleSpec,
  onAnyChange,
}: {
  testimonials: Testimonial[];
  specializations: string[];
  specSelected: Set<string>;
  setSpecSelected: (v: Set<string>) => void;
  toggleSpec: (s: string) => void;
  onAnyChange: () => void;
}) {
  const SPEC_LIMIT = 6;
  const [showAll, setShowAll] = useState(false);

  const allChecked = specSelected.size === 0;
  const hasMore = specializations.length > SPEC_LIMIT;
  const visible = showAll ? specializations : specializations.slice(0, SPEC_LIMIT);

  return (
    <div className="mt-4 space-y-3">
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={() => {
            setSpecSelected(new Set());
            onAnyChange();
          }}
          className="h-4 w-4 accent-primary"
        />
        <span>All specializations</span>
      </label>

      {visible.map((s) => (
        <label key={s} className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={specSelected.has(s)}
            onChange={() => {
              toggleSpec(s);
              onAnyChange();
            }}
            className="h-4 w-4 accent-primary"
          />
          <span className="flex-1">{s}</span>
          <span className="text-muted-foreground text-xs">
            ({testimonials.filter((x) => x.specialization === s).length})
          </span>
        </label>
      ))}

      {hasMore && (
        <button
          type="button"
          className="text-sm text-primary hover:underline mt-2"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
}

const HowItWorksPage = () => {
  const { t } = useI18n();

  // ====== 1) Steps ======
  const steps = useMemo(
    () => [
      { key: "1", title: "1. Describe your task", img: howImg1 },
      { key: "2", title: "2. Get matched with pros", img: howImg2 },
      { key: "3", title: "3. Chat, confirm & pay securely", img: howImg3 },
    ],
    []
  );

  // ====== 2) Why us ======
  const stories: Story[] = useMemo(
    () => [
      {
        title: "How customers save time with reliable pros",
        metricTop: "15% faster task completion",
        metricBottom: "More predictable outcomes",
        cta: "Read more",
        img: howImg1,
      },
      {
        title: "How teams scale with on-demand help",
        metricTop: "300+ tasks done monthly",
        metricBottom: "Project time reduced",
        cta: "Read more",
        img: howImg2,
      },
      {
        title: "How businesses improve productivity",
        metricTop: "20% productivity growth",
        metricBottom: "Verified specialists, real reviews",
        cta: "Read more",
        img: howImg1,
      },
    ],
    []
  );

  // ====== 3) Testimonials ======
  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        title: `"Great platform — My Year-Long Experience"`,
        name: "Shivani S.",
        rating: 5,
        text:
          "I have been using the platform for a year and it has been mostly positive. The communication is smooth and I easily found specialists that match my needs.",
        date: "Jan 21, 2025",
        specialization: "Development & IT",
        companySize: "1–50 employees",
      },
      {
        title: `"TaskPro is great for hiring"`,
        name: "Amy E.",
        rating: 5,
        text:
          "Very well organized and user friendly. When I have a project, I use it regularly. The matching and messaging make it easy to finalize details.",
        date: "Jan 8, 2025",
        specialization: "Design & Creative",
        companySize: "1–50 employees",
      },
      {
        title: `"Fast and transparent"`,
        name: "Олег",
        rating: 5,
        text:
          "Зручно, прозоро і реально швидко. Мені підібрало кілька спеціалістів під бюджет.",
        date: "Dec 13, 2024",
        specialization: "Home Services",
        companySize: "51–1000 employees",
      },
      {
        title: `"Good results, would use again"`,
        name: "Марина",
        rating: 4,
        text:
          "Все супер. Хотілося б більше варіантів по району, але загалом сервіс класний.",
        date: "Nov 2, 2024",
        specialization: "Home Services",
        companySize: "1–50 employees",
      },
      {
        title: `"Quick help for urgent tasks"`,
        name: "Денис",
        rating: 5,
        text:
          "Домовився за 5 хвилин, майстер приїхав вчасно. Рекомендую.",
        date: "Oct 18, 2024",
        specialization: "Delivery & Moving",
        companySize: "1–50 employees",
      },
      {
        title: `"Perfect for small business"`,
        name: "Катерина",
        rating: 5,
        text:
          "Знайшла спеціаліста на прибирання за вечір. Дуже зручно.",
        date: "Sep 5, 2024",
        specialization: "Business Services",
        companySize: "1–50 employees",
      },
      {
        title: `"Easy to compare offers"`,
        name: "Andrii",
        rating: 5,
        text: "Got multiple offers quickly, compared reviews and hired the best one.",
        date: "Aug 1, 2024",
        specialization: "Home Services",
        companySize: "1–50 employees",
      },
      {
        title: `"Saved me a lot of time"`,
        name: "Olena",
        rating: 5,
        text: "Created a task in minutes and got matched with a pro the same day.",
        date: "Jul 12, 2024",
        specialization: "Business Services",
        companySize: "1–50 employees",
      },
    ],
    []
  );

  const specializations = useMemo(() => {
    const uniq = Array.from(new Set(testimonials.map((x) => x.specialization)));
    return uniq.sort((a, b) => a.localeCompare(b));
  }, [testimonials]);

  // Filters state
  const [sortBy, setSortBy] = useState<SortKey>("most_recent");
  const [sortOpen, setSortOpen] = useState(true);
  const [specOpen, setSpecOpen] = useState(true);

  const [specSelected, setSpecSelected] = useState<Set<string>>(new Set()); // empty = all
  const allSpecsChecked = specSelected.size === 0;

  const toggleSpec = (s: string) => {
    setSpecSelected((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const filteredTestimonials = useMemo(() => {
    let list = [...testimonials];

    if (specSelected.size > 0) {
      list = list.filter((x) => specSelected.has(x.specialization));
    }

    if (sortBy === "highest_rating") {
      list.sort((a, b) => b.rating - a.rating);
      return list;
    }

    // most_recent (строковые даты у тебя уже в порядке месяц-день-года, но сравнение строкой ок для демо)
    list.sort((a, b) => (a.date < b.date ? 1 : -1));
    return list;
  }, [testimonials, sortBy, specSelected]);

  // ✅ Show more
  const PAGE_SIZE = 3;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // когда меняются фильтры — сбрасываем пагинацию
  const resetVisible = () => setVisibleCount(PAGE_SIZE);

  const visibleTestimonials = useMemo(
    () => filteredTestimonials.slice(0, visibleCount),
    [filteredTestimonials, visibleCount]
  );
  const canShowMore = visibleCount < filteredTestimonials.length;

  // ====== 4) FAQ ======
  const faqItems = useMemo(
    () => [
      {
        q: "Почему стоит выбрать TaskPro?",
        a: "TaskPro помогает быстро найти проверенного специалиста: сравнить предложения, цены, рейтинг и отзывы — и выбрать лучший вариант без лишних звонков.",
      },
      {
        q: "Как вы проверяете специалистов?",
        a: "Мы используем профили, рейтинги и отзывы клиентов, а также отслеживаем качество выполнения задач. Позже можно добавить верификацию и дополнительные проверки.",
      },
      {
        q: "Как формируется рейтинг и отзывы?",
        a: "Рейтинг основан на оценках клиентов после выполнения работы. Отзывы — это обратная связь, которая помогает другим пользователям выбрать специалиста.",
      },
      {
        q: "Сколько стоит размещение задания?",
        a: "Размещение задания бесплатно. Вы заранее согласовываете условия со специалистом.",
      },
      {
        q: "Что делать, если специалист не подошёл?",
        a: "Вы можете выбрать другого исполнителя из предложений или обновить задание, чтобы получить более точные отклики.",
      },
      {
        q: "Как быстро я получу предложения?",
        a: "Зависит от категории, города и детализации. Чем точнее описание — тем быстрее и релевантнее отклики.",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* HERO */}
        <section className="py-14 md:py-16">
          <div className="container px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("how_title") || "How it works"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Getting help has never been easier — post a task, compare offers, and hire the right pro.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {steps.map((it) => (
                <div key={it.key}>
                  <div className="relative overflow-hidden rounded-[28px] aspect-[16/9] md:aspect-[16/10] border border-border/30 shadow-soft">
                    <PhotoCard src={it.img} />
                  </div>
                  <div className="mt-5 text-xl md:text-2xl font-semibold tracking-tight">
                    {it.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="py-14 md:py-20">
          <div className="container px-4">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Why customers choose TaskPro
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  Real outcomes, fast matching, and transparent choices.
                </p>
              </div>

              <Button asChild variant="outline" className="rounded-full hidden md:inline-flex">
                <Link to="/categories">Browse services</Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {stories.map((s, idx) => (
                <UpworkStoryCard key={idx} story={s} />
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <Button asChild variant="outline" className="rounded-full w-full">
                <Link to="/categories">Browse services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28 bg-[#121212] text-white">
          <div className="container px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Часті запитання</h2>
            <p className="mt-4 text-lg text-white/70">
              Відповіді про сервіс, довіру та те, чому нас обирають.
            </p>

            <div className="mt-12 space-y-10">
              {faqItems.map((item, idx) => (
                <div key={idx}>
                  <h3 className="text-lg md:text-xl font-semibold">{item.q}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/70">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-white/10 text-sm text-white/60">
              Не знайшли відповідь? Напишіть нам — допоможемо.
            </div>
          </div>
        </section>

        {/* REVIEWS Upwork style */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
              What clients say about specialists on TaskPro
            </h2>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* LEFT FILTERS */}
              <aside className="lg:col-span-4">
                <div className="space-y-10">
                  {/* Sort by */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Sort by</div>
                      <button
                        type="button"
                        className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-secondary"
                        onClick={() => setSortOpen((v) => !v)}
                        aria-label="Toggle Sort by"
                      >
                        <ChevronDown
                          className={[
                            "w-4 h-4 transition",
                            sortOpen ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </button>
                    </div>

                    {sortOpen && (
                      <div className="mt-3 rounded-xl border border-border bg-background shadow-soft overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            setSortBy("most_recent");
                            resetVisible();
                          }}
                          className={[
                            "w-full px-4 py-3 text-left text-sm hover:bg-secondary flex items-center justify-between",
                            sortBy === "most_recent" ? "bg-secondary/60" : "",
                          ].join(" ")}
                        >
                          <span>Most recent</span>
                          {sortBy === "most_recent" && (
                            <span className="text-xs text-muted-foreground">✓</span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSortBy("highest_rating");
                            resetVisible();
                          }}
                          className={[
                            "w-full px-4 py-3 text-left text-sm hover:bg-secondary flex items-center justify-between",
                            sortBy === "highest_rating" ? "bg-secondary/60" : "",
                          ].join(" ")}
                        >
                          <span>Highest rating</span>
                          {sortBy === "highest_rating" && (
                            <span className="text-xs text-muted-foreground">✓</span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Specialization */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Specialization</div>
                      <button
                        type="button"
                        className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-secondary"
                        onClick={() => setSpecOpen((v) => !v)}
                        aria-label="Toggle Specialization"
                      >
                        <ChevronDown
                          className={[
                            "w-4 h-4 transition",
                            specOpen ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </button>
                    </div>

                    {specOpen && (
                      <SpecializationFilter
                        testimonials={testimonials}
                        specializations={specializations}
                        specSelected={specSelected}
                        setSpecSelected={setSpecSelected}
                        toggleSpec={toggleSpec}
                        onAnyChange={resetVisible}
                      />
                    )}
                  </div>
                </div>
              </aside>

              {/* RIGHT LIST */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-border overflow-hidden bg-background">
                  {visibleTestimonials.length === 0 ? (
                    <div className="p-6 text-muted-foreground">
                      No reviews match selected filters.
                    </div>
                  ) : (
                    visibleTestimonials.map((r, idx) => (
                      <div
                        key={`${r.name}-${idx}`}
                        className={[
                          "p-6 md:p-7",
                          idx !== 0 ? "border-t border-border" : "",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-xl md:text-2xl font-semibold">
                              {r.title}
                            </div>

                            <div className="mt-2 text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                              {r.companySize && <span>Company size: {r.companySize}</span>}
                              <span>•</span>
                              <span>{r.date}</span>
                            </div>

                            <div className="mt-3">
                              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs text-foreground">
                                {r.specialization}
                              </span>
                            </div>
                          </div>

                          <Stars value={r.rating} />
                        </div>

                        <div className="mt-4 text-foreground leading-relaxed">
                          {r.text}{" "}
                          <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => alert("Open full review (demo)")}
                          >
                            More
                          </button>
                        </div>

                        <div className="mt-5 text-sm text-muted-foreground">{r.name}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* Show more */}
                <div className="mt-6 flex justify-center">
                  {canShowMore ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full px-8"
                      onClick={() =>
                        setVisibleCount((c) =>
                          Math.min(filteredTestimonials.length, c + PAGE_SIZE)
                        )
                      }
                    >
                      Show more
                    </Button>
                  ) : (
                    filteredTestimonials.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        You’ve reached the end.
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

           
             
      
          </div>
        </section>
      </main>
 <CTASection />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;