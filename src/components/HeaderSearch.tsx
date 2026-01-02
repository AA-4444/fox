import { Search } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/mock/catalog";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  buttonText: string;
  onSubmit?: () => void;
  dense?: boolean; // true = компактный (для хедера)
};

const norm = (s: string) => s.trim().toLowerCase();

export default function HeaderSearch({
  value,
  onChange,
  placeholder,
  buttonText,
  onSubmit,
  dense = false,
}: Props) {
  const { t } = useI18n();

  const matches = useMemo(() => {
	const q = norm(value);
	if (!q) return [];
	return CATEGORIES.filter((c) => {
	  const a = norm(c.title);
	  const b = norm(t(c.nameKey));
	  return a.includes(q) || b.includes(q);
	}).slice(0, 6);
  }, [value, t]);

  // ✅ дропдаун только когда пользователь начал печатать
  const showDropdown = value.trim().length > 0 && matches.length > 0;

  return (
	<div className="relative">
	  <div
		className={[
		  // ✅ как в Services: rounded-xl (не 2xl)
		  "flex items-center gap-2 rounded-xl border border-border bg-white/95 shadow-soft",
		  dense ? "h-[44px] px-3" : "h-[48px] px-3",
		].join(" ")}
	  >
		<Search className="w-5 h-5 text-muted-foreground" />

		<input
		  value={value}
		  onChange={(e) => onChange(e.target.value)}
		  placeholder={placeholder}
		  className="flex-1 bg-transparent outline-none text-sm min-w-0"
		  onKeyDown={(e) => {
			if (e.key === "Enter") onSubmit?.();
		  }}
		/>

		<Button
		  className={[
			// ✅ перебиваем дефолтные скругления Button (shadcn)
			"!rounded-xl text-sm",
			dense ? "h-[36px] px-4" : "h-[40px] px-5",
		  ].join(" ")}
		  onClick={onSubmit}
		  type="button"
		>
		  {buttonText}
		</Button>
	  </div>

	  {/* ✅ dropdown подсказки (только когда печатают) */}
	  {showDropdown && (
		<div className="absolute left-0 right-0 mt-2 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50">
		  <div className="px-4 py-3 text-xs text-muted-foreground">Категории</div>

		  <div className="pb-2">
			{matches.map((c) => (
			  <button
				key={c.id}
				type="button"
				onClick={() => {
				  const q = value.trim() || t(c.nameKey) || c.title;
				  window.location.assign(
					`/task/create/cid/${c.id}?q=${encodeURIComponent(q)}`
				  );
				}}
				className="w-full text-left px-4 py-3 hover:bg-secondary transition flex items-center justify-between"
			  >
				<span className="text-sm font-medium">{t(c.nameKey) || c.title}</span>
				<span className="text-xs text-muted-foreground">→</span>
			  </button>
			))}
		  </div>
		</div>
	  )}
	</div>
  );
}