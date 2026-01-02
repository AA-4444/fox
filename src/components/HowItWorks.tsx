import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

import howImg1 from "@/assets/01.jpg";
import howImg2 from "@/assets/2.jpg";
import howImg3 from "@/assets/02.jpg";

type Mode = "hire" | "work";
type Variant = "photo1" | "photo2" | "photo3" | "dark";

const HowItWorks = () => {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>("hire");

  const items = useMemo(() => {
    return mode === "hire"
      ? [
          { key: "1", title: t("how_hire_1_title"), variant: "photo1" as const },
          { key: "2", title: t("how_hire_2_title"), variant: "photo2" as const },
          { key: "3", title: t("how_hire_3_title"), variant: "photo3" as const },
        ]
      : [
          { key: "1", title: t("how_work_1_title"), variant: "photo1" as const },
          { key: "2", title: t("how_work_2_title"), variant: "photo2" as const },
          { key: "3", title: t("how_work_3_title"), variant: "photo3" as const },
        ];
  }, [mode, t]);

  const getImgByVariant = (v: Variant) => {
    if (v === "photo1") return howImg1;
    if (v === "photo2") return howImg2;
    if (v === "photo3") return howImg3;
    return howImg1;
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4">
{/* Заголовок + переключатель */}
      <div className="flex flex-col items-start gap-4 mb-10 md:mb-12 md:flex-row md:items-center md:justify-between md:gap-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t("how_title")}
        </h2>
      
        {/* Переключатель как в Services/CategoryTabs */}
        <div className="shrink-0">
          <div className="inline-flex items-center rounded-2xl border border-border bg-secondary p-[5px]">
            <button
              type="button"
              onClick={() => setMode("hire")}
              className={[
                "px-5 h-10 rounded-xl text-sm font-medium transition",
                mode === "hire"
                  ? "bg-background text-foreground shadow-soft"
                  : "bg-transparent text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {t("how_toggle_hiring")}
            </button>
      
            <button
              type="button"
              onClick={() => setMode("work")}
              className={[
                "px-5 h-10 rounded-xl text-sm font-medium transition",
                mode === "work"
                  ? "bg-background text-foreground shadow-soft"
                  : "bg-transparent text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {t("how_toggle_work")}
            </button>
          </div>
        </div>
      </div>
        {/* 3 карточки */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {items.map((it) => (
            <div key={it.key}>
              <div className="relative overflow-hidden rounded-[28px] aspect-[16/9] md:aspect-[16/10]">
                {it.variant === "dark" ? (
                  <DarkFindCard label={t("how_find_label")} />
                ) : (
                  <PhotoCard src={getImgByVariant(it.variant)} />
                )}
              </div>

              <div className="mt-5 text-xl md:text-2xl font-semibold tracking-tight">
                {it.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

/* ===== helpers ===== */

function DarkFindCard({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-black">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-3xl md:text-4xl font-bold">{label}</div>
      </div>

      <div className="absolute left-10 bottom-10">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary blur-[10px] opacity-70" />
          <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-primary" />
        </div>
      </div>

      <div className="absolute right-10 bottom-10">
        <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-soft">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-5 rounded bg-black/70" />
            <span className="w-1.5 h-5 rounded bg-black/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoCard({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0">
      {!failed ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-red-600 text-white flex items-center justify-center font-bold">
          IMAGE NOT FOUND (проверь src/assets/01.jpg, 2.jpg, 02.jpg)
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </div>
  );
}