export type CategoryId = number;

export type Category = {
  id: CategoryId;
  title: string;       // fallback (можно оставить)
  nameKey: string;     // ключ перевода (используй t(nameKey))
  popular?: boolean;
  type: "home" | "delivery" | "freelance" | "tutors" | "business" | "tech";
};

export const CATEGORIES: Category[] = [
  { id: 481, title: "Ремонт техники", nameKey: "cat_tech_repair", type: "tech", popular: true },
  { id: 101, title: "Сантехник", nameKey: "sub_plumber", type: "home", popular: true },
  { id: 102, title: "Электрик", nameKey: "sub_electrician", type: "home", popular: true },
  { id: 201, title: "Уборка дома", nameKey: "sub_home_cleaning", type: "home", popular: true },
  { id: 202, title: "Сборка мебели", nameKey: "sub_assembly", type: "home", popular: true },
  { id: 301, title: "Помощь с переездом", nameKey: "sub_local_moving", type: "delivery", popular: true },
  { id: 401, title: "Дизайн", nameKey: "cat_design", type: "freelance" },
];

export type ProReview = { name: string; rating: number; text: string };

export type ProPriceItem = {
  cid?: CategoryId;
  title: string;
  price: number;
  unit?: string;
};

export type Pro = {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  city: string;

  categories: CategoryId[];
  fromPrice: number;

  successRate: number;

  headline: string;
  about: string;

  prices: { title: string; price: number }[];
  priceList?: ProPriceItem[];

  reviews: ProReview[];
};

export const PROS: Pro[] = [
  {
	id: "p1",
	name: "Алексей М.",
	avatarUrl: "https://i.pravatar.cc/200?img=12",
	rating: 4.9,
	reviewsCount: 128,
	city: "Київ",
	categories: [481, 102],
	fromPrice: 500,
	successRate: 97,
	headline: "Ремонт техники и электрика. Быстро и аккуратно.",
	about:
	  "10+ лет опыта. Диагностика, ремонт, замена комплектующих. Работаю по договоренности, без сюрпризов.",
	prices: [
	  { title: "Диагностика", price: 300 },
	  { title: "Ремонт (прост.)", price: 700 },
	  { title: "Ремонт (сложн.)", price: 1500 },
	],
	priceList: [
	  { cid: 481, title: "Диагностика техники", price: 300, unit: "₴" },
	  { cid: 481, title: "Установка Windows 10", price: 400, unit: "₴" },
	  { cid: 481, title: "Удаление вирусов", price: 400, unit: "₴" },
	  { cid: 102, title: "Замена розетки", price: 250, unit: "₴" },
	  { cid: 102, title: "Монтаж люстры", price: 600, unit: "₴" },
	],
	reviews: [
	  { name: "Ірина", rating: 5, text: "Все зробив швидко, пояснив причину поломки." },
	  { name: "Олег", rating: 5, text: "Профі, рекомендую." },
	  { name: "Марина", rating: 4, text: "Все добре, але трохи довше, ніж очікувала." },
	  { name: "Денис", rating: 5, text: "Акуратно, по справі, без нав’язування зайвого." },
	  { name: "Антон", rating: 5, text: "Супер, зручно, швидко." },
	],
  },
  {
	id: "p2",
	name: "Сергей К.",
	avatarUrl: "https://i.pravatar.cc/200?img=32",
	rating: 4.8,
	reviewsCount: 76,
	city: "Львів",
	categories: [101, 201, 202],
	fromPrice: 400,
	successRate: 94,
	headline: "Домашние услуги: сантехника, сборка, мелкий ремонт.",
	about:
	  "Пунктуальность, чистота, прозрачная цена. Приезжаю со своим инструментом.",
	prices: [
	  { title: "Выезд", price: 200 },
	  { title: "Сантехника", price: 600 },
	  { title: "Сборка мебели", price: 500 },
	],
	priceList: [
	  { cid: 101, title: "Замена смесителя", price: 600, unit: "₴" },
	  { cid: 201, title: "Уборка 1-комн.", price: 900, unit: "₴" },
	  { cid: 202, title: "Сборка шкафа", price: 700, unit: "₴" },
	],
	reviews: [
	  { name: "Марина", rating: 5, text: "Дуже акуратно, швидко." },
	  { name: "Назар", rating: 4, text: "Все ок, але приїхав на 20 хв пізніше." },
	],
  },
];

export function findCategory(id: number) {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}

export function filterProsByCategory(cid: number) {
  return PROS.filter((p) => p.categories.includes(cid));
}

export function getCategoryTitlesByIds(ids: CategoryId[]) {
  return ids
	.map((id) => CATEGORIES.find((c) => c.id === id))
	.filter(Boolean)
	.map((c) => c!.title);
}

/** ✅ новый хелпер: поиск категорий по строке (и title, и перевод) */
export function searchCategories(
  query: string,
  getLabel: (c: Category) => string
) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CATEGORIES.filter((c) => {
	const a = (c.title || "").toLowerCase();
	const b = (getLabel(c) || "").toLowerCase();
	return a.includes(q) || b.includes(q);
  });
}