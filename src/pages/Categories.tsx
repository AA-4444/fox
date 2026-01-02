import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";
import { Link } from "react-router-dom";
import {
  Wrench,
  Tv,
  Paintbrush,
  HardHat,
  Sofa,
  SprayCan,
  Truck,
  Briefcase,
  Car,
  Package,
  Megaphone,
  Palette,
  BookOpen,
  Code,
  Camera,
  PawPrint,
  Heart,
  PartyPopper,
  Languages,
  Dumbbell,
  Bot,
  Laptop,
  Users,
  Calculator,
  ChevronRight,
} from "lucide-react";

interface ServiceCategory {
  id: string;
  cid: number;
  nameKey: string;
  count: string;
  icon: React.ReactNode;
  subKeys: string[];
  tab: string;
}

const allCategories: ServiceCategory[] = [
  {
    id: "handyman",
    cid: 101,
    nameKey: "cat_handyman",
    count: "105K",
    icon: <Wrench className="w-6 h-6" />,
    subKeys: ["sub_plumber", "sub_electrician", "sub_general_repairs", "sub_carpenter", "sub_appliance_installation"],
    tab: "home",
  },
  {
    id: "tech-repair",
    cid: 481,
    nameKey: "cat_tech_repair",
    count: "842K",
    icon: <Tv className="w-6 h-6" />,
    subKeys: ["sub_appliance_repair", "sub_computer_help", "sub_phone_repair", "sub_smart_home_setup"],
    tab: "home",
  },
  {
    id: "renovation",
    cid: 103,
    nameKey: "cat_renovation",
    count: "165K",
    icon: <Paintbrush className="w-6 h-6" />,
    subKeys: ["sub_apartment_renovation", "sub_tile_work", "sub_painting", "sub_flooring"],
    tab: "home",
  },
  {
    id: "construction",
    cid: 104,
    nameKey: "cat_construction",
    count: "158K",
    icon: <HardHat className="w-6 h-6" />,
    subKeys: ["sub_general_labor", "sub_welding", "sub_roofing", "sub_concrete_work"],
    tab: "home",
  },
  {
    id: "furniture",
    cid: 105,
    nameKey: "cat_furniture",
    count: "63K",
    icon: <Sofa className="w-6 h-6" />,
    subKeys: ["sub_assembly", "sub_repair", "sub_custom_furniture", "sub_ikea_assembly"],
    tab: "home",
  },
  {
    id: "cleaning",
    cid: 201,
    nameKey: "cat_cleaning",
    count: "177K",
    icon: <SprayCan className="w-6 h-6" />,
    subKeys: ["sub_home_cleaning", "sub_deep_cleaning", "sub_window_washing", "sub_office_cleaning"],
    tab: "home",
  },
  {
    id: "auto",
    cid: 202,
    nameKey: "cat_auto_services",
    count: "31K",
    icon: <Car className="w-6 h-6" />,
    subKeys: ["sub_roadside_help", "sub_diagnostics", "sub_body_work", "sub_detailing"],
    tab: "home",
  },
  {
    id: "domestic",
    cid: 203,
    nameKey: "cat_domestic_help",
    count: "99K",
    icon: <Users className="w-6 h-6" />,
    subKeys: ["sub_babysitting", "sub_elderly_care", "sub_housekeeping", "sub_cooking"],
    tab: "home",
  },
  {
    id: "pets",
    cid: 204,
    nameKey: "cat_pet_services",
    count: "105K",
    icon: <PawPrint className="w-6 h-6" />,
    subKeys: ["sub_dog_walking", "sub_pet_sitting", "sub_grooming", "sub_vet_visits"],
    tab: "home",
  },
  {
    id: "beauty",
    cid: 205,
    nameKey: "cat_beauty_wellness",
    count: "24K",
    icon: <Heart className="w-6 h-6" />,
    subKeys: ["sub_massage", "sub_makeup", "sub_hair_styling", "sub_nail_care"],
    tab: "home",
  },
  {
    id: "courier",
    cid: 301,
    nameKey: "cat_courier_services",
    count: "693K",
    icon: <Package className="w-6 h-6" />,
    subKeys: ["sub_same_day_delivery", "sub_food_delivery", "sub_document_delivery", "sub_package_pickup"],
    tab: "delivery",
  },
  {
    id: "moving",
    cid: 302,
    nameKey: "cat_moving_transport",
    count: "143K",
    icon: <Truck className="w-6 h-6" />,
    subKeys: ["sub_local_moving", "sub_long_distance", "sub_furniture_transport", "sub_loading_help"],
    tab: "delivery",
  },
  {
    id: "marketing",
    cid: 401,
    nameKey: "cat_digital_marketing",
    count: "178K",
    icon: <Megaphone className="w-6 h-6" />,
    subKeys: ["sub_seo", "sub_social_media", "sub_ppc", "sub_content_marketing"],
    tab: "freelance",
  },
  {
    id: "design",
    cid: 402,
    nameKey: "cat_design",
    count: "112K",
    icon: <Palette className="w-6 h-6" />,
    subKeys: ["sub_logo_design", "sub_uiux", "sub_branding", "sub_illustrations"],
    tab: "freelance",
  },
  {
    id: "development",
    cid: 403,
    nameKey: "cat_web_development",
    count: "67K",
    icon: <Code className="w-6 h-6" />,
    subKeys: ["sub_website_creation", "sub_app_development", "sub_ecommerce", "sub_maintenance"],
    tab: "freelance",
  },
  {
    id: "photo-video",
    cid: 404,
    nameKey: "cat_photo_video",
    count: "51K",
    icon: <Camera className="w-6 h-6" />,
    subKeys: ["sub_photography", "sub_videography", "sub_photo_editing", "sub_drone_shots"],
    tab: "freelance",
  },
  {
    id: "ai-services",
    cid: 405,
    nameKey: "cat_ai_services",
    count: "9K",
    icon: <Bot className="w-6 h-6" />,
    subKeys: ["sub_ai_content", "sub_ai_consulting", "sub_automation", "sub_data_analytics"],
    tab: "freelance",
  },
  {
    id: "online-work",
    cid: 406,
    nameKey: "cat_online_work",
    count: "321K",
    icon: <Laptop className="w-6 h-6" />,
    subKeys: ["sub_data_entry", "sub_research", "sub_transcription", "sub_virtual_assistant"],
    tab: "freelance",
  },
  {
    id: "tutors",
    cid: 501,
    nameKey: "cat_tutoring",
    count: "123K",
    icon: <BookOpen className="w-6 h-6" />,
    subKeys: ["sub_math", "sub_science", "sub_test_prep", "sub_language_learning"],
    tab: "tutors",
  },
  {
    id: "translation",
    cid: 502,
    nameKey: "cat_translation",
    count: "74K",
    icon: <Languages className="w-6 h-6" />,
    subKeys: ["sub_document_translation", "sub_interpretation", "sub_localization"],
    tab: "tutors",
  },
  {
    id: "coaching",
    cid: 503,
    nameKey: "cat_coaching_trainers",
    count: "24K",
    icon: <Dumbbell className="w-6 h-6" />,
    subKeys: ["sub_personal_training", "sub_yoga", "sub_sports_coaching", "sub_dance"],
    tab: "tutors",
  },
  {
    id: "business-services",
    cid: 601,
    nameKey: "cat_business_services",
    count: "36K",
    icon: <Briefcase className="w-6 h-6" />,
    subKeys: ["sub_legal", "sub_accounting", "sub_real_estate", "sub_consulting"],
    tab: "business",
  },
  {
    id: "accounting",
    cid: 602,
    nameKey: "cat_accounting",
    count: "12K",
    icon: <Calculator className="w-6 h-6" />,
    subKeys: ["sub_bookkeeping", "sub_tax_preparation", "sub_financial_planning"],
    tab: "business",
  },
  {
    id: "events",
    cid: 603,
    nameKey: "cat_event_services",
    count: "41K",
    icon: <PartyPopper className="w-6 h-6" />,
    subKeys: ["sub_dj", "sub_catering", "sub_event_photography", "sub_entertainment"],
    tab: "business",
  },
];

export default function Categories() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-40 md:pt-40 pb-16">
        <div className="container px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("categories_title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("categories_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category) => (
              <div
                key={category.id}
                className="group bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t(category.nameKey)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} {t("categories_professionals")}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {category.subKeys.map((subKey) => (
                    <li key={subKey}>
                      <Link
                        to={`/task/create/cid/${category.cid}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary transition-colors group/item"
                      >
                        <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                          {t(subKey)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}