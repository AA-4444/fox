import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, Star } from "lucide-react";
import CTASection from "@/components/CTASection";

import proBg from "@/assets/pro-bg.jpg";
import proStory1 from "@/assets/1.jpg";
import proStory2 from "@/assets/2.jpg";

type Story = {
  title: string;
  metricTop: string;
  metricBottom: string;
  cta: string;
  img: string;
};

type ProReview = {
  name: string;
  title: string;
  rating: number; // 1..5
  text: string;
  date: string; // "Jan 21, 2025"
  specialization: string;
  experience?: string; // "2 years on TaskPro"
};

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
            <Link to="/auth">{story.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

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

type SortKey = "most_recent" | "highest_rating";

export default function ForPros() {
  // ====== STORIES (как Upwork) ======
  const stories: Story[] = useMemo(
    () => [
      {
        title: "How pros earn more with better clients",
        metricTop: "Higher quality leads",
        metricBottom: "Choose tasks that fit your rate",
        cta: "Become a Pro",
        img: proStory1,
      },
      {
        title: "How specialists build reputation faster",
        metricTop: "Reviews that convert",
        metricBottom: "Profile + ratings = more invites",
        cta: "Create profile",
        img: proStory2,
      },
      {
        title: "How pros save time on finding work",
        metricTop: "Less calls, more jobs",
        metricBottom: "Smart matching by category and city",
        cta: "Start now",
        img: proStory1,
      },
    ],
    []
  );

  // ====== PRO REVIEWS (Upwork style) ======
  const reviews: ProReview[] = useMemo(
    () => [
      {
        title: `"Steady flow of orders, clear communication"`,
        name: "Michael R.",
        rating: 5,
        text:
          "After optimizing my profile, I started getting more relevant tasks. I like that clients describe the job clearly and we confirm everything in chat.",
        date: "Jan 21, 2025",
        specialization: "Home Services",
        experience: "2 years on TaskPro",
      },
      {
        title: `"Good clients, fast decisions"`,
        name: "Olena K.",
        rating: 5,
        text:
          "I receive multiple requests per week. I can pick only the jobs I want, and clients usually decide fast because they can compare offers and reviews.",
        date: "Jan 8, 2025",
        specialization: "Cleaning",
        experience: "1 year on TaskPro",
      },
      {
        title: `"Helpful for growing my small business"`,
        name: "Andrii S.",
        rating: 5,
        text:
          "It helped me scale from random orders to a stable pipeline. Reviews really matter here — once I got first 10 reviews, it took off.",
        date: "Dec 13, 2024",
        specialization: "Repair & Tech",
        experience: "18 months on TaskPro",
      },
      {
        title: `"Great matching for my niche"`,
        name: "Kateryna D.",
        rating: 4,
        text:
          "I get tasks that fit my specialization. Sometimes I’d like more filters for distance, but overall it’s efficient and transparent.",
        date: "Nov 2, 2024",
        specialization: "Business Services",
        experience: "9 months on TaskPro",
      },
      {
        title: `"Fast onboarding, easy to start"`,
        name: "Serhii P.",
        rating: 5,
        text:
          "Created profile in one evening. The first tasks came quickly. I like that I can set my own terms and avoid low-quality requests.",
        date: "Oct 18, 2024",
        specialization: "Delivery & Moving",
        experience: "6 months on TaskPro",
      },
      {
        title: `"Nice platform for flexible schedule"`,
        name: "Iryna M.",
        rating: 5,
        text:
          "I work part-time and choose only weekend tasks. It’s perfect to earn extra while keeping my own schedule.",
        date: "Sep 5, 2024",
        specialization: "Tutoring",
        experience: "1 year on TaskPro",
      },
      {
        title: `"Transparent offers and less stress"`,
        name: "Dmytro H.",
        rating: 5,
        text:
          "No endless calls — everything is in the task description and chat. Clients know what they want, and I can respond with a clear offer.",
        date: "Aug 1, 2024",
        specialization: "Freelance",
        experience: "8 months on TaskPro",
      },
      {
        title: `"Good ROI on my time"`,
        name: "Natalia V.",
        rating: 5,
        text:
          "I spend less time searching for work and more time doing it. I can reject tasks that don’t fit, and focus on profitable ones.",
        date: "Jul 12, 2024",
        specialization: "Beauty & Wellness",
        experience: "10 months on TaskPro",
      },
    ],
    []
  );

  const specializations = useMemo(() => {
    const uniq = Array.from(new Set(reviews.map((x) => x.specialization)));
    return uniq.sort((a, b) => a.localeCompare(b));
  }, [reviews]);

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

  const filtered = useMemo(() => {
    let list = [...reviews];

    if (specSelected.size > 0) {
      list = list.filter((x) => specSelected.has(x.specialization));
    }

    if (sortBy === "highest_rating") {
      list.sort((a, b) => b.rating - a.rating);
      return list;
    }

    // most_recent
    list.sort((a, b) => (a.date < b.date ? 1 : -1));
    return list;
  }, [reviews, specSelected, sortBy]);

  // Show more
  const PAGE_SIZE = 4;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const canShowMore = visibleCount < filtered.length;

  // Specializations "see more"
  const SPEC_PREVIEW = 6;
  const [specShowAll, setSpecShowAll] = useState(false);
  const shownSpecs = specShowAll ? specializations : specializations.slice(0, SPEC_PREVIEW);
  const canSpecSeeMore = specializations.length > SPEC_PREVIEW;

  // Header line helper (ровные шевроны)
  const FilterHeader = ({
    title,
    open,
    onToggle,
  }: {
    title: string;
    open: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium">{title}</div>
      <button
        type="button"
        className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-secondary"
        onClick={onToggle}
        aria-label={`Toggle ${title}`}
      >
        <ChevronDown className={["w-4 h-4 transition", open ? "rotate-180" : ""].join(" ")} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

  <main className="pb-16">
    {/* ================= HERO (FULL SCREEN, BLACK STATS) ================= */}
    <section className="relative w-full h-[100dvh] overflow-hidden flex flex-col">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${proBg})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
  
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col flex-1 pt-[64px] md:pt-[80px]">
        {/* ===== MAIN HERO ===== */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Turn Your Skills Into Income
            </h1>
  
            <p className="text-lg md:text-xl text-white/80 mb-8 font-medium">
              Set your rates, choose jobs you like, and build your reputation with real reviews.
            </p>
  
            <Button asChild size="lg" className="rounded-full px-10">
              <Link to="/auth">Become a Pro</Link>
            </Button>
          </div>
        </div>
  
        {/* ===== STATS (RAISED + BOLDER) ===== */}
        <div className="shrink-0 bg-black border-t border-white/10 -mt-10 md:-mt-14">
          <div className="container px-4 py-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  $50M+
                </div>
                <div className="text-white/80 text-sm font-semibold">
                  Paid to pros
                </div>
              </div>
  
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  150K+
                </div>
                <div className="text-white/80 text-sm font-semibold">
                  Active pros
                </div>
              </div>
  
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  $1,200
                </div>
                <div className="text-white/80 text-sm font-semibold">
                  Avg. monthly earnings
                </div>
              </div>
  
              <div>
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  4.9
                </div>
                <div className="text-white/80 text-sm font-semibold">
                  Pro satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
     
     

        {/* WHY CHOOSE (Upwork stories for pros) */}
        <section className="py-14 md:py-20">
          <div className="container px-4">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Why pros choose TaskPro
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  More control, better clients, and a faster way to grow.
                </p>
              </div>

              <Button asChild variant="outline" className="rounded-full hidden md:inline-flex">
                <Link to="/auth">Join as a Pro</Link>
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {stories.map((s, idx) => (
                <UpworkStoryCard key={idx} story={s} />
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <Button asChild variant="outline" className="rounded-full w-full">
                <Link to="/auth">Join as a Pro</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* HOW TO JOIN (оставил как было, но можно потом переделать под фото) */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How to Get Started</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { step: 1, title: "Create Your Profile", desc: "Sign up and tell us about your skills and experience" },
                { step: 2, title: "Get Verified", desc: "Complete our verification process to build trust" },
                { step: 3, title: "Start Getting Jobs", desc: "Browse available tasks and submit offers" },
                { step: 4, title: "Get Paid", desc: "Complete jobs and receive secure payments" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 bg-card p-6 rounded-xl border border-border/50"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRO REVIEWS (Upwork style) */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container px-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
              What pros say about working on TaskPro
            </h2>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* FILTERS */}
              <aside className="lg:col-span-4">
                <div className="space-y-10">
                  {/* Sort by */}
                  <div>
                    <FilterHeader
                      title="Sort by"
                      open={sortOpen}
                      onToggle={() => setSortOpen((v) => !v)}
                    />
                    {sortOpen && (
                      <div className="mt-3 rounded-xl border border-border bg-background shadow-soft overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            setSortBy("most_recent");
                            setVisibleCount(PAGE_SIZE);
                          }}
                          className={[
                            "w-full px-4 py-3 text-left text-sm hover:bg-secondary",
                            sortBy === "most_recent" ? "bg-secondary/60" : "",
                          ].join(" ")}
                        >
                          Most recent
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSortBy("highest_rating");
                            setVisibleCount(PAGE_SIZE);
                          }}
                          className={[
                            "w-full px-4 py-3 text-left text-sm hover:bg-secondary",
                            sortBy === "highest_rating" ? "bg-secondary/60" : "",
                          ].join(" ")}
                        >
                          Highest rating
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Specialization */}
                  <div>
                    <FilterHeader
                      title="Specialization"
                      open={specOpen}
                      onToggle={() => setSpecOpen((v) => !v)}
                    />

                    {specOpen && (
                      <div className="mt-4 space-y-3">
                        <label className="flex items-center gap-3 text-sm">
                          <input
                            type="checkbox"
                            checked={allSpecsChecked}
                            onChange={() => {
                              setSpecSelected(new Set());
                              setVisibleCount(PAGE_SIZE);
                            }}
                            className="h-4 w-4 accent-primary"
                          />
                          <span>All specializations</span>
                        </label>

                        {shownSpecs.map((s) => (
                          <label key={s} className="flex items-center gap-3 text-sm">
                            <input
                              type="checkbox"
                              checked={specSelected.has(s)}
                              onChange={() => {
                                toggleSpec(s);
                                setVisibleCount(PAGE_SIZE);
                              }}
                              className="h-4 w-4 accent-primary"
                            />
                            <span className="flex-1">{s}</span>
                            <span className="text-muted-foreground text-xs">
                              ({reviews.filter((x) => x.specialization === s).length})
                            </span>
                          </label>
                        ))}

                        {canSpecSeeMore && (
                          <button
                            type="button"
                            className="text-sm text-primary hover:underline mt-2"
                            onClick={() => setSpecShowAll((v) => !v)}
                          >
                            {specShowAll ? "See less" : "See more"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </aside>

              {/* LIST */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-border overflow-hidden bg-background">
                  {visible.length === 0 ? (
                    <div className="p-6 text-muted-foreground">
                      No reviews match selected filters.
                    </div>
                  ) : (
                    visible.map((r, idx) => (
                      <div
                        key={`${r.name}-${idx}`}
                        className={["p-6 md:p-7", idx !== 0 ? "border-t border-border" : ""].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-xl md:text-2xl font-semibold">
                              {r.title}
                            </div>

                            <div className="mt-2 text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                              {r.experience && <span>{r.experience}</span>}
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

                <div className="mt-6 flex justify-center">
                  {canShowMore ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full px-8"
                      onClick={() =>
                        setVisibleCount((c) => Math.min(filtered.length, c + PAGE_SIZE))
                      }
                    >
                      Show more
                    </Button>
                  ) : (
                    filtered.length > 0 && (
                      <div className="text-sm text-muted-foreground">You’ve reached the end.</div>
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
}
