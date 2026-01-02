import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { CATEGORIES, searchCategories } from "@/mock/catalog";

export default function SearchPick() {
  const { t } = useI18n();
  const [sp] = useSearchParams();
  const q = sp.get("q") ?? "";

  const list = searchCategories(q, (c) => t(c.nameKey));

  return (
	<div className="min-h-screen bg-background">
	  <Header />

	  <main className="pt-[96px] md:pt-[112px] pb-16">
		<div className="container px-4 max-w-3xl">
		  <h1 className="text-2xl md:text-3xl font-bold">Выберите категорию</h1>
		  <p className="mt-2 text-muted-foreground">
			По запросу: <span className="font-medium text-foreground">{q}</span>
		  </p>

		  <div className="mt-6 grid gap-3">
			{list.map((c) => (
			  <Link
				key={c.id}
				to={`/task/create/cid/${c.id}?q=${encodeURIComponent(q)}`}
				className="rounded-2xl border border-border bg-card hover:bg-secondary/40 transition p-4 flex items-center justify-between"
			  >
				<div className="font-semibold">{t(c.nameKey) || c.title}</div>
				<div className="text-sm text-muted-foreground">→</div>
			  </Link>
			))}
		  </div>

		  {list.length === 0 && (
			<div className="mt-8 rounded-2xl border border-border p-6 bg-card">
			  <div className="font-semibold">Ничего не нашли</div>
			  <div className="mt-2 text-sm text-muted-foreground">
				Попробуйте другой запрос или откройте все категории.
			  </div>
			  <div className="mt-4">
				<Link className="underline" to="/categories">
				  Все категории
				</Link>
			  </div>
			</div>
		  )}
		</div>
	  </main>

	  <Footer />
	</div>
  );
}