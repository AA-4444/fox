import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Clock, Tag, Sparkles } from "lucide-react";

type NewsCategory = "Product" | "Updates" | "Safety" | "Guides" | "Company";

type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD or pretty
  readTime: string;
  category: NewsCategory;
  image: string;
  featured?: boolean;
};

const CATS: { key: NewsCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Product", label: "Product" },
  { key: "Updates", label: "Updates" },
  { key: "Safety", label: "Safety" },
  { key: "Guides", label: "Guides" },
  { key: "Company", label: "Company" },
];

const MOCK: NewsPost[] = [
  {
	id: "n1",
	title: "New matching experience: faster offers and smarter suggestions",
	excerpt:
	  "We improved the way tasks get matched to specialists so you receive more relevant offers, быстрее и точнее.",
	date: "2025-12-20",
	readTime: "4 min read",
	category: "Product",
	image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
	featured: true,
  },
  {
	id: "n2",
	title: "Trust & Safety: how ratings and reviews work",
	excerpt:
	  "Explaining the signals we use to keep the marketplace transparent: reviews, success rate, and verified activity.",
	date: "2025-12-12",
	readTime: "6 min read",
	category: "Safety",
	image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
	featured: true,
  },
  {
	id: "n3",
	title: "Guide: write a task that gets responses in minutes",
	excerpt:
	  "A short checklist that helps specialists understand the scope and respond with accurate prices.",
	date: "2025-11-28",
	readTime: "5 min read",
	category: "Guides",
	image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
  },
  {
	id: "n4",
	title: "Platform updates: cleaner categories & better search",
	excerpt:
	  "We refined categories and search suggestions to reduce mis-matches (ремонт телефона vs ремонт мебели).",
	date: "2025-11-10",
	readTime: "3 min read",
	category: "Updates",
	image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
  },
  {
	id: "n5",
	title: "Company: what we’re building next",
	excerpt:
	  "A quick look at what’s coming: more filters, clearer specialization, and more control for customers and pros.",
	date: "2025-10-02",
	readTime: "4 min read",
	category: "Company",
	image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
  },
  {
	id: "n6",
	title: "Safety tips: how to hire a specialist with confidence",
	excerpt:
	  "Best practices: compare offers, ask clarifying questions, and confirm details before work starts.",
	date: "2025-09-14",
	readTime: "7 min read",
	category: "Safety",
	image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
	<span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground">
	  {children}
	</span>
  );
}

function formatDate(d: string) {
  // оставляем как есть, если уже pretty
  if (!d.includes("-")) return d;
  const [y, m, day] = d.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, day ?? 1);
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export default function News() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]["key"]>("All");
  const [showAll, setShowAll] = useState(false);

  const featured = useMemo(() => MOCK.filter((x) => x.featured).slice(0, 2), []);
  const sorted = useMemo(() => {
	const list = [...MOCK].sort((a, b) => (a.date < b.date ? 1 : -1));
	return list;
  }, []);

  const filtered = useMemo(() => {
	const s = q.trim().toLowerCase();
	return sorted.filter((p) => {
	  const okCat = cat === "All" ? true : p.category === cat;
	  if (!okCat) return false;
	  if (!s) return true;
	  const hay = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
	  return hay.includes(s);
	});
  }, [sorted, cat, q]);

  const list = showAll ? filtered : filtered.slice(0, 6);

  return (
	<div className="min-h-screen bg-background">
	  <Header />

	  {/* по стилю как HowItWorks: чуть больше воздуха сверху */}
	  <main className="pt-24 pb-16">
		{/* HERO */}
		<section className="py-10 md:py-14">
		  <div className="container px-4">
			<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
			  <div className="max-w-2xl">
				<div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
				  <Sparkles className="w-4 h-4" />
				  Product news • Guides • Safety
				</div>

				<h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
				  News & Updates
				</h1>

				<p className="mt-3 text-lg text-muted-foreground">
				  Что нового в TaskPro: улучшения поиска, доверие/безопасность и гайды, чтобы быстрее получать
				  предложения от специалистов.
				</p>
			  </div>

			  <div className="w-full lg:w-[520px]">
				<div className="rounded-2xl border border-border bg-card shadow-soft p-3">
				  <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 h-[46px]">
					<Search className="w-5 h-5 text-muted-foreground" />
					<input
					  value={q}
					  onChange={(e) => setQ(e.target.value)}
					  placeholder="Search news…"
					  className="flex-1 bg-transparent outline-none text-sm"
					/>
					<Button
					  type="button"
					  className="h-[38px] px-4 rounded-xl"
					  onClick={() => {}}
					>
					  Search
					</Button>
				  </div>

				  <div className="mt-3 flex flex-wrap gap-2">
					{CATS.map((c) => (
					  <button
						key={c.key}
						type="button"
						onClick={() => setCat(c.key)}
						className={[
						  "px-3 py-1.5 rounded-full text-sm border transition",
						  cat === c.key
							? "bg-primary text-primary-foreground border-primary"
							: "bg-background hover:bg-secondary border-border",
						].join(" ")}
					  >
						{c.label}
					  </button>
					))}
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</section>

		{/* FEATURED (Upwork-style big cards) */}
		<section className="py-8 md:py-10">
		  <div className="container px-4">
			<div className="flex items-end justify-between gap-6 mb-6">
			  <div>
				<h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured</h2>
				<p className="mt-2 text-muted-foreground">Главные обновления и важные анонсы.</p>
			  </div>
			  <Button asChild variant="outline" className="rounded-full hidden md:inline-flex">
				<Link to="/categories">Browse services</Link>
			  </Button>
			</div>

			<div className="grid lg:grid-cols-2 gap-8">
			  {featured.map((p) => (
				<article
				  key={p.id}
				  className="relative overflow-hidden rounded-[28px] border border-border/40 bg-card shadow-soft"
				>
				  <div className="relative h-[260px] md:h-[300px]">
					<img
					  src={p.image}
					  alt=""
					  className="absolute inset-0 w-full h-full object-cover"
					  loading="lazy"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
					<div className="absolute left-6 right-6 bottom-6 text-white">
					  <div className="flex items-center gap-2">
						<Pill>
						  <Tag className="w-3.5 h-3.5" />
						  {p.category}
						</Pill>
						<span className="text-white/80 text-sm flex items-center gap-1">
						  <Clock className="w-4 h-4" />
						  {p.readTime}
						</span>
					  </div>

					  <h3 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">
						{p.title}
					  </h3>

					  <p className="mt-2 text-white/85">
						{p.excerpt}
					  </p>

					  <div className="mt-4 flex items-center justify-between">
						<span className="text-white/75 text-sm">{formatDate(p.date)}</span>
						<Button className="rounded-full" asChild>
						  <Link to={`/news/${p.id}`}>
							Read <ArrowRight className="w-4 h-4 ml-2" />
						  </Link>
						</Button>
					  </div>
					</div>
				  </div>
				</article>
			  ))}
			</div>

			<div className="mt-6 md:hidden">
			  <Button asChild variant="outline" className="rounded-full w-full">
				<Link to="/categories">Browse services</Link>
			  </Button>
			</div>
		  </div>
		</section>

		{/* LIST + SIDEBAR */}
		<section className="py-10 md:py-12">
		  <div className="container px-4">
			<div className="grid lg:grid-cols-12 gap-10">
			  {/* LEFT LIST */}
			  <div className="lg:col-span-8">
				<div className="flex items-center justify-between gap-4 mb-6">
				  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Latest</h2>
				  <div className="text-sm text-muted-foreground">
					Showing {list.length} of {filtered.length}
				  </div>
				</div>

				<div className="grid sm:grid-cols-2 gap-6">
				  {list.map((p) => (
					<article
					  key={p.id}
					  className="group rounded-2xl border border-border/50 bg-card shadow-soft overflow-hidden hover:shadow-elevated transition"
					>
					  <div className="relative h-[170px]">
						<img
						  src={p.image}
						  alt=""
						  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition"
						  loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
						<div className="absolute left-4 right-4 bottom-4 flex items-center justify-between">
						  <Pill>{p.category}</Pill>
						  <span className="text-white/80 text-xs flex items-center gap-1">
							<Clock className="w-3.5 h-3.5" />
							{p.readTime}
						  </span>
						</div>
					  </div>

					  <div className="p-5">
						<h3 className="text-lg font-semibold leading-snug">
						  {p.title}
						</h3>
						<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
						  {p.excerpt}
						</p>

						<div className="mt-4 flex items-center justify-between">
						  <span className="text-xs text-muted-foreground">
							{formatDate(p.date)}
						  </span>
						  <Link
							to={`/news/${p.id}`}
							className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
						  >
							Read <ArrowRight className="w-4 h-4" />
						  </Link>
						</div>
					  </div>
					</article>
				  ))}
				</div>

				<div className="mt-8 flex justify-center">
				  {filtered.length > 6 && (
					<Button
					  type="button"
					  variant="outline"
					  className="rounded-full px-8"
					  onClick={() => setShowAll((v) => !v)}
					>
					  {showAll ? "Show less" : "Show more"}
					</Button>
				  )}
				</div>
			  </div>

			  {/* RIGHT SIDEBAR */}
			  <aside className="lg:col-span-4">
				<div className="space-y-6">
				  {/* Subscribe */}
				  <div className="rounded-2xl border border-border/50 bg-card shadow-soft p-6">
					<div className="text-lg font-semibold">Get updates</div>
					<p className="mt-2 text-sm text-muted-foreground">
					  Подпишись на новости продукта и гайды.
					</p>

					<div className="mt-4 flex gap-2">
					  <input
						className="flex-1 h-11 rounded-xl border border-border bg-background px-3 outline-none text-sm"
						placeholder="Email"
					  />
					  <Button className="h-11 rounded-xl px-4" type="button">
						Subscribe
					  </Button>
					</div>

					<p className="mt-3 text-xs text-muted-foreground">
					  No spam. Unsubscribe anytime.
					</p>
				  </div>

				  {/* Quick links */}
				  <div className="rounded-2xl border border-border/50 bg-card shadow-soft p-6">
					<div className="text-lg font-semibold">Quick links</div>
					<div className="mt-4 grid gap-2">
					  <Link className="rounded-xl border border-border bg-background px-4 py-3 hover:bg-secondary transition" to="/how-it-works">
						How it works
					  </Link>
					  <Link className="rounded-xl border border-border bg-background px-4 py-3 hover:bg-secondary transition" to="/categories">
						Browse categories
					  </Link>
					  <Link className="rounded-xl border border-border bg-background px-4 py-3 hover:bg-secondary transition" to="/for-pros">
						For pros
					  </Link>
					</div>
				  </div>

				  {/* CTA */}
				  <div className="rounded-[28px] bg-primary text-primary-foreground p-6 shadow-soft">
					<div className="text-xl font-bold leading-tight">
					  Ready to post your first task?
					</div>
					<p className="mt-2 text-primary-foreground/80 text-sm">
					  Создай задачу за минуту и получай предложения.
					</p>
					<div className="mt-5">
					  <Button asChild variant="secondary" className="rounded-full px-6">
						<Link to="/categories">Get started</Link>
					  </Button>
					</div>
				  </div>
				</div>
			  </aside>
			</div>
		  </div>
		</section>
	  </main>

	  <Footer />
	</div>
  );
}