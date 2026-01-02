import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { findCategory, filterProsByCategory } from "@/mock/catalog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

type Payment = "cash" | "card" | "online";

export default function TaskCreate() {
  const { t, lang } = useI18n();

  const { cid } = useParams();
  const categoryId = Number(cid);
  const category = findCategory(categoryId);

  const [sp] = useSearchParams();
  const presetQ = sp.get("q") ?? "";

  const pros = useMemo(() => filterProsByCategory(categoryId), [categoryId]);

  // base fields
  const [budget, setBudget] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState(lang === "en" ? "Ukraine" : "Україна");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // ✅ подставляем тему из поиска
  const [details, setDetails] = useState(presetQ ? `${presetQ}\n` : "");

  const [payment, setPayment] = useState<Payment>("cash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // tech dynamic fields
  const isTech = category?.type === "tech";
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");

  if (!category) {
	return (
	  <div className="min-h-screen bg-background">
		<Header />
		<main className="pt-[96px] md:pt-[112px] pb-16">
		  <div className="container px-4">
			<div className="rounded-2xl border border-border p-6 bg-card shadow-soft">
			  <div className="text-lg font-semibold">{t("task_category_not_found")}</div>
			  <div className="mt-3">
				<Link className="underline" to="/">
				  {t("task_back_home")}
				</Link>
			  </div>
			</div>
		  </div>
		</main>
		<Footer />
	  </div>
	);
  }

  const submit = () => {
	alert(
	  `${t("task_created")}\n${t("task_category")}: ${category.title}\n${t("task_budget")}: ${
		budget || "-"
	  }\n${t("task_city")}: ${city || "-"}`
	);
  };

  return (
	<div className="min-h-screen bg-background">
	  <Header />

	  <main className="pt-[96px] md:pt-[112px] pb-16">
		<div className="container px-4">
		  {/* top row */}
		  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
			<div>
			  <div className="text-sm text-muted-foreground">
				<Link to="/" className="hover:underline">
				  {t("task_breadcrumb_home")}
				</Link>{" "}
				/ {t("task_breadcrumb_create")}
			  </div>

			  <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
				{category.title}
			  </h1>

			  <p className="mt-2 text-muted-foreground">{t("task_subtitle")}</p>
			</div>

			<div className="flex gap-3">
			  <Button variant="outline" asChild>
				<Link to="/">{t("task_back")}</Link>
			  </Button>
			  <Button onClick={submit}>{t("task_publish")}</Button>
			</div>
		  </div>

		  {/* layout */}
		  <div className="grid lg:grid-cols-12 gap-8">
			{/* form */}
			<div className="lg:col-span-7">
			  <div className="rounded-[28px] border border-border bg-card shadow-soft">
				<div className="p-6 md:p-8">
				  {/* Budget */}
				  <Section title={t("task_section_budget")}>
					<div className="grid sm:grid-cols-2 gap-4">
					  <Field label={t("task_amount_uah")}>
						<input
						  value={budget}
						  onChange={(e) =>
							setBudget(e.target.value === "" ? "" : Number(e.target.value))
						  }
						  type="number"
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						  placeholder={t("task_amount_placeholder")}
						/>
					  </Field>

					  <Field label={t("task_when_needed")}>
						<input
						  value={date}
						  onChange={(e) => setDate(e.target.value)}
						  type="date"
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						/>
					  </Field>
					</div>
				  </Section>

				  {/* Location */}
				  <Section title={t("task_section_location")}>
					<div className="grid sm:grid-cols-2 gap-4">
					  <Field label={t("task_country")}>
						<input
						  value={country}
						  onChange={(e) => setCountry(e.target.value)}
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						/>
					  </Field>

					  <Field label={t("task_city")}>
						<input
						  value={city}
						  onChange={(e) => setCity(e.target.value)}
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						  placeholder={t("task_city_placeholder")}
						/>
					  </Field>
					</div>

					<div className="mt-4">
					  <Field label={t("task_address")}>
						<input
						  value={address}
						  onChange={(e) => setAddress(e.target.value)}
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						  placeholder={t("task_address_placeholder")}
						/>
					  </Field>
					</div>
				  </Section>

				  {/* Dynamic category fields */}
				  {isTech && (
					<Section title={t("task_section_tech")}>
					  <div className="grid sm:grid-cols-2 gap-4">
						<Field label={t("task_brand")}>
						  <input
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
							className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
							placeholder={t("task_brand_placeholder")}
						  />
						</Field>

						<Field label={t("task_model")}>
						  <input
							value={model}
							onChange={(e) => setModel(e.target.value)}
							className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
							placeholder={t("task_model_placeholder")}
						  />
						</Field>
					  </div>

					  <div className="mt-4">
						<Field label={t("task_problem")}>
						  <select
							value={problem}
							onChange={(e) => setProblem(e.target.value)}
							className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						  >
							<option value="">{t("task_problem_choose")}</option>
							<option value="no_power">{t("task_problem_no_power")}</option>
							<option value="screen">{t("task_problem_screen")}</option>
							<option value="sound">{t("task_problem_sound")}</option>
							<option value="other">{t("task_problem_other")}</option>
						  </select>
						</Field>
					  </div>
					</Section>
				  )}

				  {/* Details */}
				  <Section title={t("task_section_details")}>
					<textarea
					  value={details}
					  onChange={(e) => setDetails(e.target.value)}
					  className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none min-h-[130px]"
					  placeholder={t("task_details_placeholder")}
					/>
				  </Section>

				  {/* Payment */}
				  <Section title={t("task_section_payment")}>
					<div className="grid sm:grid-cols-3 gap-3">
					  <RadioCard
						active={payment === "cash"}
						title={t("task_pay_cash")}
						onClick={() => setPayment("cash")}
					  />
					  <RadioCard
						active={payment === "card"}
						title={t("task_pay_card")}
						onClick={() => setPayment("card")}
					  />
					  <RadioCard
						active={payment === "online"}
						title={t("task_pay_online")}
						onClick={() => setPayment("online")}
					  />
					</div>
				  </Section>

				  {/* Contact */}
				  <Section title={t("task_section_contact")}>
					<div className="grid sm:grid-cols-2 gap-4">
					  <Field label={t("task_name")}>
						<input
						  value={name}
						  onChange={(e) => setName(e.target.value)}
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						  placeholder={t("task_name_placeholder")}
						/>
					  </Field>

					  <Field label={t("task_phone")}>
						<input
						  value={phone}
						  onChange={(e) => setPhone(e.target.value)}
						  className="w-full rounded-xl border border-border bg-background px-4 h-11 outline-none"
						  placeholder={t("task_phone_placeholder")}
						/>
					  </Field>
					</div>
				  </Section>

				  <div className="mt-8 flex justify-end">
					<Button onClick={submit} className="rounded-full px-6">
					  {t("task_publish")}
					</Button>
				  </div>
				</div>
			  </div>
			</div>

			{/* pros */}
			<div className="lg:col-span-5">
			  <div className="rounded-[28px] border border-border bg-card shadow-soft">
				<div className="p-6 md:p-8">
				  <div className="flex items-center justify-between gap-4">
					<div>
					  <div className="text-lg font-semibold">{t("task_matching_pros")}</div>
					  <div className="text-sm text-muted-foreground mt-1">
						{t("task_by_category")}:{" "}
						<span className="font-medium text-foreground">{category.title}</span>
					  </div>
					</div>
					<div className="text-sm text-muted-foreground">
					  {pros.length} {t("task_count_suffix")}
					</div>
				  </div>

				  <div className="mt-6 grid gap-4">
					{pros.map((p) => (
					  <Link
						key={p.id}
						to={`/pro/${p.id}`}
						className="group rounded-2xl border border-border/60 hover:border-border bg-background/60 hover:bg-secondary/40 transition p-4"
					  >
						<div className="flex items-center gap-3">
						  <img
							src={p.avatarUrl}
							alt={p.name}
							className="w-12 h-12 rounded-full object-cover"
						  />
						  <div className="min-w-0 flex-1">
							<div className="flex items-center justify-between gap-3">
							  <div className="font-semibold truncate">{p.name}</div>
							  <div className="text-sm text-muted-foreground">
								{p.rating.toFixed(1)} · {p.reviewsCount}
							  </div>
							</div>
							<div className="text-sm text-muted-foreground truncate">{p.headline}</div>
						  </div>
						</div>

						<div className="mt-3 flex items-center justify-between">
						  <div className="text-sm text-muted-foreground">{p.city}</div>
						  <div className="text-sm font-semibold">
							{t("task_from")} {p.fromPrice} ₴
						  </div>
						</div>
					  </Link>
					))}
				  </div>

				  <div className="mt-6 text-xs text-muted-foreground">{t("task_demo_note")}</div>
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

/* ===== UI helpers ===== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
	<div className="mt-8 first:mt-0">
	  <div className="text-base font-semibold mb-4">{title}</div>
	  {children}
	</div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
	<div>
	  <div className="text-sm font-medium mb-2">{label}</div>
	  {children}
	</div>
  );
}

function RadioCard({
  title,
  active,
  onClick,
}: {
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
	<button
	  type="button"
	  onClick={onClick}
	  className={[
		"rounded-2xl border px-4 h-12 text-sm font-medium transition",
		active ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background hover:bg-secondary/40",
	  ].join(" ")}
	>
	  {title}
	</button>
  );
}