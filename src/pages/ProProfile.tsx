import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CATEGORIES, PROS, type CategoryId } from "@/mock/catalog";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useMemo, useState } from "react";


type PriceItem = {
  cid?: CategoryId; 
  title: string;
  price: number;
  unit?: string;
};

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
	<div className="flex items-center gap-0.5">
	  {Array.from({ length: 5 }).map((_, i) => (
		<Star
		  key={i}
		  className={[
			"w-4 h-4",
			i < full ? "fill-primary text-primary" : "text-muted-foreground",
		  ].join(" ")}
		/>
	  ))}
	</div>
  );
}

export default function ProProfile() {
  const { id } = useParams();
  const pro = PROS.find((p) => p.id === id);

  if (!pro) {
	return (
	  <div className="min-h-screen bg-background">
		<Header />
		<main className="pt-[96px] container px-4">
		  <div className="rounded-2xl border border-border p-6">
			<div className="text-lg font-semibold">Специалист не найден</div>
			<div className="mt-3">
			  <Link className="underline" to="/">
				Вернуться на главную
			  </Link>
			</div>
		  </div>
		</main>
		<Footer />
	  </div>
	);
  }

  // ===== Категории специалиста (cid -> title) =====
  const categoryTitles = useMemo(() => {
	return pro.categories
	  .map((cid) => CATEGORIES.find((c) => c.id === cid))
	  .filter(Boolean)
	  .map((c) => c!.title);
  }, [pro.categories]);

  // ===== Прайс (поддержка старого и нового формата) =====
  const priceList: PriceItem[] = useMemo(() => {
	if ((pro as any).priceList?.length) return (pro as any).priceList as PriceItem[];

	// fallback из старого формата
	return (pro as any).prices?.map((x: any) => ({
	  title: x.title,
	  price: x.price,
	  unit: "₴",
	})) ?? [];
  }, [pro]);

  // ===== Группировка прайса по категории =====
  const groupedPrices = useMemo(() => {
	const map = new Map<string, PriceItem[]>();

	for (const item of priceList) {
	  const title =
		item.cid != null
		  ? (CATEGORIES.find((c) => c.id === item.cid)?.title ?? "Услуги")
		  : "Услуги";

	  const arr = map.get(title) ?? [];
	  arr.push(item);
	  map.set(title, arr);
	}

	return Array.from(map.entries());
  }, [priceList]);

  // ===== Отзывы с пагинацией =====
  const REVIEWS_PER_PAGE = 3;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(pro.reviews.length / REVIEWS_PER_PAGE));
  const pageClamped = Math.min(page, totalPages);

  const visibleReviews = useMemo(() => {
	const start = (pageClamped - 1) * REVIEWS_PER_PAGE;
	return pro.reviews.slice(start, start + REVIEWS_PER_PAGE);
  }, [pro.reviews, pageClamped]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
	<div className="min-h-screen bg-background">
	  <Header />

	  <main className="pt-[96px] md:pt-[112px] pb-16">
		<div className="container px-4">
		  <div className="mb-6">
			<Link to="/" className="text-sm text-muted-foreground hover:underline">
			  ← Назад
			</Link>
		  </div>

		  <div className="grid lg:grid-cols-12 gap-8">
			{/* main */}
			<div className="lg:col-span-8">
			  <div className="rounded-[28px] border border-border bg-card shadow-soft p-6 md:p-8">
				{/* top */}
				<div className="flex items-start gap-4">
				  <img
					src={pro.avatarUrl}
					alt={pro.name}
					className="w-16 h-16 rounded-2xl object-cover"
				  />

				  <div className="flex-1 min-w-0">
					<div className="text-2xl font-bold">{pro.name}</div>

					<div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					  <span>{pro.city}</span>
					  <span>·</span>
					  <span className="flex items-center gap-2">
						<Stars value={pro.rating} />
						<span>{pro.rating.toFixed(1)}</span>
					  </span>
					  <span>·</span>
					  <span>{pro.reviewsCount} отзывов</span>
					</div>

					{/* ✅ категории (чипы) */}
					{categoryTitles.length > 0 && (
					  <div className="mt-3 flex flex-wrap gap-2">
						{categoryTitles.map((c) => (
						  <span
							key={c}
							className="px-3 py-1 rounded-full border border-border bg-background/60 text-sm"
						  >
							{c}
						  </span>
						))}
					  </div>
					)}

					<div className="mt-4 text-base font-medium">{pro.headline}</div>
				  </div>
				</div>

				{/* about */}
				<div className="mt-8">
				  <div className="text-lg font-semibold mb-3">О специалисте</div>
				  <p className="text-muted-foreground leading-relaxed">{pro.about}</p>
				</div>

				{/* prices */}
				<div className="mt-10">
				  <div className="text-lg font-semibold mb-3">Прайс</div>

				  <div className="grid gap-6">
					{groupedPrices.map(([groupName, items]) => (
					  <div key={groupName} className="rounded-2xl border border-border bg-background/50">
						<div className="px-4 py-3 border-b border-border font-semibold">
						  {groupName}
						</div>

						<div className="divide-y divide-border">
						  {items.map((x) => (
							<div
							  key={`${groupName}-${x.title}-${x.price}`}
							  className="px-4 py-3 flex items-center justify-between gap-4"
							>
							  <div className="text-sm text-foreground">{x.title}</div>
							  <div className="text-sm font-semibold whitespace-nowrap">
								{x.price} {x.unit ?? "₴"}
							  </div>
							</div>
						  ))}
						</div>
					  </div>
					))}
				  </div>
				</div>

				{/* reviews */}
				<div className="mt-10">
				  <div className="flex items-center justify-between gap-4 mb-3">
					<div className="text-lg font-semibold">Отзывы</div>

					{pro.reviews.length > REVIEWS_PER_PAGE && (
					  <div className="flex items-center gap-2">
						<button
						  type="button"
						  onClick={goPrev}
						  disabled={pageClamped === 1}
						  className="h-9 w-9 rounded-full border border-border flex items-center justify-center disabled:opacity-40"
						  aria-label="Previous reviews page"
						>
						  <ChevronLeft className="w-5 h-5" />
						</button>

						<div className="text-sm text-muted-foreground">
						  {pageClamped} / {totalPages}
						</div>

						<button
						  type="button"
						  onClick={goNext}
						  disabled={pageClamped === totalPages}
						  className="h-9 w-9 rounded-full border border-border flex items-center justify-center disabled:opacity-40"
						  aria-label="Next reviews page"
						>
						  <ChevronRight className="w-5 h-5" />
						</button>
					  </div>
					)}
				  </div>

				  {/* ✅ без фона: просто колонка */}
				  <div className="grid gap-5">
					{visibleReviews.map((r, idx) => (
					  <div key={`${r.name}-${idx}`} className="border-b border-border/60 pb-5">
						<div className="flex items-start justify-between gap-3">
						  <div className="font-semibold">{r.name}</div>
						  <div className="flex items-center gap-2">
							<Stars value={r.rating} />
						  </div>
						</div>
						<div className="mt-2 text-sm text-muted-foreground leading-relaxed">
						  {r.text}
						</div>
					  </div>
					))}
				  </div>
				</div>
			  </div>
			</div>

			{/* side */}
			<div className="lg:col-span-4">
			  <div className="rounded-[28px] border border-border bg-card shadow-soft p-6 md:p-8">
				<div className="text-lg font-semibold">Заказать работу</div>

				<div className="mt-4 grid grid-cols-2 gap-3">
				  <div className="rounded-2xl border border-border bg-background/60 p-4">
					<div className="text-xs text-muted-foreground">Выполнено успешно</div>
					<div className="mt-1 text-2xl font-bold">{pro.successRate}%</div>
				  </div>
				  <div className="rounded-2xl border border-border bg-background/60 p-4">
					<div className="text-xs text-muted-foreground">Стартовая цена</div>
					<div className="mt-1 text-2xl font-bold">от {pro.fromPrice} ₴</div>
				  </div>
				</div>

				<div className="mt-6 grid gap-3">
				  <Button
					className="rounded-full"
					onClick={() => alert(`Открываем создание заказа для: ${pro.name} (демо)`)}
				  >
					Запросить работу
				  </Button>

				  <Button variant="outline" className="rounded-full" asChild>
					<Link to="/">Вернуться на главную</Link>
				  </Button>
				</div>

				<div className="mt-6 text-xs text-muted-foreground">
				  Демо: дальше будет чат/заявка/бронь + оплата.
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </main>

	  <Footer />
	</div>
  );
}