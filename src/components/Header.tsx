import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import type { Lang } from "@/i18n/translations";
import HeaderSearch from "@/components/HeaderSearch";
import { CATEGORIES } from "@/mock/catalog";
import logo from "@/assets/logo.png";

const navLinks = [
  { key: "nav_services", href: "/categories" },
  { key: "nav_how", href: "/how-it-works" },
  { key: "nav_pros", href: "/for-pros" },
  { key: "nav_about", href: "/about" },
  { key: "nav_news", href: "/news" },
] as const;

const LANGS: { code: Lang; label: string }[] = [
  { code: "ua", label: "UA" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const DESKTOP_HEADER_H = 80;
const norm = (s: string) => s.trim().toLowerCase();

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showInlineSearch, setShowInlineSearch] = useState(false);

  const { lang, setLang, t } = useI18n();
  const langRef = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  
  const isIndex = location.pathname === "/";

  // close language dropdown on outside click / esc
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };

    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  
  useEffect(() => {
    if (!isIndex) {
      setShowInlineSearch(true);
      return;
    }

    const onScroll = () => {
      const threshold = Math.max(0, window.innerHeight - DESKTOP_HEADER_H);
      setShowInlineSearch(window.scrollY >= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isIndex]);

  const onSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;

    const exact =
      CATEGORIES.find((c) => norm(c.title) === norm(q)) ||
      CATEGORIES.find((c) => norm(t(c.nameKey)) === norm(q));

    if (exact) {
      nav(`/task/create/cid/${exact.id}?q=${encodeURIComponent(q)}`);
      setMobileMenuOpen(false);
      return;
    }

    const hits = CATEGORIES.filter((c) => {
      const a = norm(c.title);
      const b = norm(t(c.nameKey));
      const qq = norm(q);
      return a.includes(qq) || b.includes(qq);
    });

    if (hits.length === 1) {
      nav(`/task/create/cid/${hits[0].id}?q=${encodeURIComponent(q)}`);
      setMobileMenuOpen(false);
      return;
    }

    nav(`/search/pick?q=${encodeURIComponent(q)}`);
    setMobileMenuOpen(false);
  };

  const mobileLangButtons = useMemo(
    () =>
      LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-2 rounded-lg text-sm ${
            lang === l.code ? "bg-primary text-primary-foreground" : "bg-secondary"
          }`}
        >
          {l.label}
        </button>
      )),
    [lang, setLang]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="flex items-center justify-between h-16 md:h-20 px-6 lg:px-10 gap-4">
        {/* ===== LEFT (DESKTOP) ===== */}
        <div className="hidden md:flex items-center gap-3 min-w-0">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="TaskPro"
              className="h-16 w-auto"
            />
          </Link>

          <div className="flex items-center gap-0.5 ml-2">
            {navLinks.map((link) => (
              <Button
                key={link.key}
                variant="ghost"
                size="sm"
                asChild
                className="text-black hover:text-black hover:bg-transparent font-medium"
              >
                <Link to={link.href}>{t(link.key)}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* ===== MIDDLE INLINE SEARCH (DESKTOP) ===== */}
        <div
          className={[
            "hidden md:flex flex-1 justify-center min-w-0 transition-all duration-300",
            showInlineSearch ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden={!showInlineSearch}
        >
          <div className="w-full max-w-[520px]">
            <HeaderSearch
              dense
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t("hero_search_placeholder")}
              buttonText={t("hero_search_btn")}
              onSubmit={onSearch}
            />
          </div>
        </div>

        {/* ===== RIGHT (DESKTOP) ===== */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium text-black"
            >
              {lang.toUpperCase()}
              <ChevronDown className={`w-4 h-4 transition ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-20 rounded-xl bg-background border border-border shadow-lg overflow-hidden z-50">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-secondary ${
                      lang === l.code ? "font-semibold" : ""
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" asChild className="text-black hover:bg-transparent">
            <Link to="/auth">{t("login")}</Link>
          </Button>

          <Button size="default" asChild>
            <Link to="/auth">{t("get_started")}</Link>
          </Button>
        </div>

        {/* ===== MOBILE ===== */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="TaskPro"
              className="h-12 w-auto"
            />
          </Link>

          <button
            className="p-2 rounded-lg hover:bg-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 animate-fade-in px-4 py-4 bg-background/90 backdrop-blur-xl">
          <div className="mb-4">
            <HeaderSearch
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t("hero_search_placeholder")}
              buttonText={t("hero_search_btn")}
              onSubmit={onSearch}
            />
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                className="px-4 py-3 rounded-lg hover:bg-secondary text-foreground font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}

            <div className="px-4 pt-2">
              <div className="text-sm text-muted-foreground mb-2">{t("language")}</div>
              <div className="flex gap-2">{mobileLangButtons}</div>
            </div>

            <div className="flex gap-2 mt-4 px-4">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  {t("login")}
                </Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  {t("get_started")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;