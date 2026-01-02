import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/mock/catalog";

type Props = {
  className?: string;
  showPopular?: boolean;
};

function pickBestCategoryId(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  // скоринг: точное совпадение > начинается > содержит
  let best: { id: number; score: number } | null = null;

  for (const c of CATEGORIES) {
	const t = c.title.toLowerCase();
	let score = 0;

	if (t === q) score = 100;
	else if (t.startsWith(q)) score = 70;
	else if (t.includes(q)) score = 40;

	if (score > 0 && (!best || score > best.score)) best = { id: c.id, score };
  }

  // если ничего не нашли — можно вернуть "тех" или любой дефолт
  return best?.id ?? 481; // 481 = "Ремонт техники" (как fallback)
}

export default function ServiceSearch({ className = "", showPopular = true }: Props) {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const popular = useMemo(() => CATEGORIES.filter((c) => c.popular).slice(0, 6), []);

  const results = useMemo(() => {
	const s = q.trim().toLowerCase();
	if (!s) return [];
	return CATEGORIES.filter((c) => c.title.toLowerCase().includes(s)).slice(0, 6);
  }, [q]);

  const goCreate = (cid: number, text: string) => {
	nav(`/task/create/cid/${cid}?query=${encodeURIComponent(text)}`);
  };

  const submit = () => {
	const text = q.trim();
	if (!text) return;
	const cid = pickBestCategoryId(text);
	goCreate(cid, text);
  };

  const clickSuggestion = (cid: number) => {
	// клик по подсказке: сразу создаём заказ по этой категории,
	// а тему подставляем (можно title, можно текущий q)
	const title = CATEGORIES.find((c) => c.id === cid)?.title ?? q.trim();
	goCreate(cid, title || q.trim());
  };

  return (
	<div className={className}>
	  <div className="relative">
		<div className="flex items-center gap-2 rounded-full bg-white/95 border border-border px-3 h-[46px] shadow-soft">
		  <Search className="w-5 h-5 text-muted-foreground" />
		  <input
			value={q}
			onChange={(e) => setQ(e.target.value)}
			placeholder="Какая услуга нужна?"
			className="flex-1 bg-transparent outline-none text-sm min-w-0"
			onKeyDown={(e) => {
			  if (e.key === "Enter") submit();
			}}
		  />
		  <Button className="h-[38px] px-4 rounded-full text-sm" onClick={submit} type="button">
			Поиск
		  </Button>
		</div>

		{(results.length > 0 || (showPopular && q.trim().length === 0)) && (
		  <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-border bg-background shadow-lg overflow-hidden z-50">
			<div className="px-4 py-3 text-xs text-muted-foreground">
			  {q.trim() ? "Категории" : "Популярное"}
			</div>

			<div className="pb-2">
			  {(q.trim() ? results : popular).map((c) => (
				<button
				  key={c.id}
				  onClick={() => clickSuggestion(c.id)}
				  className="w-full text-left px-4 py-3 hover:bg-secondary transition flex items-center justify-between"
				  type="button"
				>
				  <span className="text-sm font-medium">{c.title}</span>
				  <span className="text-xs text-muted-foreground">→</span>
				</button>
			  ))}
			</div>
		  </div>
		)}
	  </div>

	  {showPopular && (
		<div className="mt-3 flex flex-wrap items-center gap-2">
		  <span className="text-sm text-muted-foreground mr-2">Популярное:</span>
		  {popular.slice(0, 5).map((c) => (
			<button
			  key={c.id}
			  onClick={() => clickSuggestion(c.id)}
			  className="px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-sm transition"
			  type="button"
			>
			  {c.title}
			</button>
		  ))}
		</div>
	  )}
	</div>
  );
}