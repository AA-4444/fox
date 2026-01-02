import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import bgImage from "@/assets/bg1.jpg";
import { useI18n } from "@/i18n/I18nProvider";

const PROMO_GRADIENT =
  "linear-gradient(90deg, rgba(20,168,0,1) 0%, rgba(87,199,133,0.92) 18%, rgba(237,221,83,1) 100%)";

// фикс. header md:h-20 = 80px
const HEADER_HEIGHT = 80;


// ✅ mobile header h-16 = 64px
const MOBILE_HEADER_HEIGHT = 64;

const HeroSection = () => {
  const { t, lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches =
    lang === "ru"
      ? ["Сантехник", "Электрик", "Уборка дома", "Сборка мебели", "Помощь с переездом"]
      : lang === "ua"
      ? ["Сантехнік", "Електрик", "Прибирання дому", "Збірка меблів", "Допомога з переїздом"]
      : ["Plumber", "Electrician", "House cleaning", "Furniture assembly", "Moving help"];

  return (
    <section className="relative w-full">
    
      
  
      
      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <div className="relative w-full h-[100dvh] overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
      
          {/* ✅ градиенты как на ПК */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      
          {/* ✅ Content: резервируем место под fixed header */}
          <div
            className="relative z-10 h-full flex flex-col px-4 pb-6"
            style={{ paddingTop: MOBILE_HEADER_HEIGHT + 12 }}
          >
            {/* Promo */}
            <div
              className="rounded-2xl px-5 py-4 flex items-center justify-between text-black"
              style={{ background: PROMO_GRADIENT }}
            >
              <div className="text-base font-bold">{t("hero_promo")}</div>
              <button className="text-sm font-semibold underline underline-offset-4">
                {t("hero_offer")}
              </button>
            </div>
      
            {/* ✅ Title block: меньше отступ */}
            <div className="mt-6">
              <h1 className="text-white font-bold text-[38px] leading-[1.02]">
                {t("hero_title_1")}
                <br />
                <span className="text-primary">{t("hero_title_2")}</span>
              </h1>
      
              <p className="mt-3 text-white/80 text-sm max-w-[32ch]">
                {t("hero_subtitle")}
              </p>
            </div>
      
            {/* Search block pinned to bottom */}
            <div className="mt-auto">
              <div className="rounded-[24px] bg-black/55 backdrop-blur-md border border-white/10 p-4">
                <div className="flex items-center gap-2 rounded-full bg-white px-3 h-[48px]">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("hero_search_placeholder")}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <Button className="h-[40px] px-5 rounded-full text-sm">
                    {t("hero_search_btn")}
                  </Button>
                </div>
      
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-white/70 mr-2">{t("hero_popular")}</span>
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSearchQuery(item)}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="relative w-full h-[100dvh] overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div
            className="relative z-10 h-full flex flex-col"
            style={{ paddingTop: HEADER_HEIGHT + 16 }}
          >
            <div className="w-full px-6 lg:px-10">
              <div
                className="rounded-2xl px-6 py-5 flex items-center justify-between text-black"
                style={{ background: PROMO_GRADIENT }}
              >
                <div className="text-xl font-bold">{t("hero_promo")}</div>
                <button className="text-sm font-semibold underline underline-offset-4">
                  {t("hero_offer")}
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-end">
              <div className="w-full px-12 lg:px-16 pb-16">
                <h1 className="text-white font-bold text-[72px] lg:text-[80px] leading-[0.98] max-w-[18ch]">
                  {t("hero_title_1")}
                  <br />
                  <span className="text-primary">{t("hero_title_2")}</span>
                </h1>

                <p className="mt-6 text-white/80 text-lg max-w-[56ch]">
                  {t("hero_subtitle")}
                </p>

                <div className="mt-10 w-[640px] rounded-[26px] bg-black/55 backdrop-blur-md border border-white/10 p-5">
                  <div className="flex items-center gap-2 rounded-full bg-white px-3 h-[48px]">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("hero_search_placeholder")}
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <Button className="h-[40px] px-5 rounded-full text-sm">
                      {t("hero_search_btn")}
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-white/70 mr-2">{t("hero_popular")}</span>
                    {popularSearches.map((item) => (
                      <button
                        key={item}
                        onClick={() => setSearchQuery(item)}
                        className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /content */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;