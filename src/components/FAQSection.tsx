import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type FaqItem = {
  q: string;
  a: string;
};

const FAQSection = () => {
  const { t } = useI18n();

  const items: FaqItem[] = useMemo(
	() => [
	  { q: t("faq_q1"), a: t("faq_a1") },
	  { q: t("faq_q2"), a: t("faq_a2") },
	  { q: t("faq_q3"), a: t("faq_a3") },
	  { q: t("faq_q4"), a: t("faq_a4") },
	  { q: t("faq_q5"), a: t("faq_a5") },
	  { q: t("faq_q6"), a: t("faq_a6") },
	],
	[t]
  );

  return (
	<section className="py-20 md:py-28 bg-[#121212] text-white">
	  <div className="container px-4 max-w-4xl">
		{/* Header */}
		<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
		  {t("faq_title")}
		</h2>

		<p className="mt-4 text-lg text-white/70">
		  {t("faq_subtitle")}
		</p>

		{/* FAQ list */}
		<div className="mt-12 space-y-10">
		  {items.map((item, idx) => (
			<div key={idx}>
			  <h3 className="text-lg md:text-xl font-semibold">
				{item.q}
			  </h3>
			  <p className="mt-3 text-base leading-relaxed text-white/70">
				{item.a}
			  </p>
			</div>
		  ))}
		</div>

		{/* Footer note */}
		<div className="mt-14 pt-8 border-t border-white/10 text-sm text-white/60">
		  {t("faq_note")}
		</div>
	  </div>
	</section>
  );
};

export default FAQSection;