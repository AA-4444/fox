import {
  Home,
  Truck,
  Briefcase,
  GraduationCap,
  Building2,
  Grid3X3,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

interface CategoryTab {
  id: string;
  labelKey:
    | "tabs_home"
    | "tabs_delivery"
    | "tabs_freelance"
    | "tabs_tutors"
    | "tabs_business"
    | "tabs_all";
  icon: React.ReactNode;
}

const tabs: CategoryTab[] = [
  { id: "home", labelKey: "tabs_home", icon: <Home className="w-5 h-5" /> },
  { id: "delivery", labelKey: "tabs_delivery", icon: <Truck className="w-5 h-5" /> },
  { id: "freelance", labelKey: "tabs_freelance", icon: <Briefcase className="w-5 h-5" /> },
  { id: "tutors", labelKey: "tabs_tutors", icon: <GraduationCap className="w-5 h-5" /> },
  { id: "business", labelKey: "tabs_business", icon: <Building2 className="w-5 h-5" /> },
  { id: "all", labelKey: "tabs_all", icon: <Grid3X3 className="w-5 h-5" /> },
];

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CategoryTabs = ({ activeTab, onTabChange }: CategoryTabsProps) => {
  const { t } = useI18n(); // ✅ ВОТ ЧЕГО НЕ ХВАТАЛО

  return (
    <div className="flex items-center justify-center gap-1 p-1.5 bg-secondary/50 rounded-2xl backdrop-blur-sm border border-border/50 shadow-soft">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-background text-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          {tab.icon}
          <span className="hidden sm:inline">
            {t(tab.labelKey)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
