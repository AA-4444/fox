import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import bgImage from "@/assets/bg1.jpg";
import { useI18n } from "@/i18n/I18nProvider";

type Role = "customer" | "specialist";

const Auth = () => {
  const { t } = useI18n();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    role: "customer" as Role,
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && !formData.role) return;

    alert(
      `${isLogin ? "Login" : "Registration"} submitted! (Frontend demo)
role: ${formData.role}`
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
{/* LOGO — back to home (site style) */}
    <Link
      to="/"
      className="
        fixed top-4 left-4 z-50
        flex items-center gap-2
        select-none
      "
    >
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
        <span className="text-primary-foreground font-bold text-xl">T</span>
      </div>
    
      {/* скрываем текст на мобиле */}
      <span className="hidden sm:block text-xl font-bold text-foreground">
        TaskPro
      </span>
    </Link>
    
      {/* Left side - Form */}
     <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-10 sm:p-8">
        <div className="w-full max-w-md">
          

          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? t("auth_login_title") : t("auth_register_title")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin ? t("auth_login_subtitle") : t("auth_register_subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ ROLE PICKER (only for registration) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth_register_as") || "Register as"}
                </label>

                {/* Tabs like your Services */}
                <div className="inline-flex w-full items-center rounded-2xl border border-border bg-secondary p-[5px]">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, role: "customer" }))}
                    className={[
                      "flex-1 h-10 rounded-xl text-sm font-medium transition px-4",
                      formData.role === "customer"
                        ? "bg-background text-foreground shadow-soft"
                        : "bg-transparent text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {t("auth_role_customer") || "Customer"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, role: "specialist" }))}
                    className={[
                      "flex-1 h-10 rounded-xl text-sm font-medium transition px-4",
                      formData.role === "specialist"
                        ? "bg-background text-foreground shadow-soft"
                        : "bg-transparent text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {t("auth_role_specialist") || "Specialist"}
                  </button>
                </div>

                {/* small hint */}
                <p className="mt-2 text-xs text-muted-foreground">
                  {formData.role === "customer"
                    ? t("auth_role_customer_hint") ||
                      "Post tasks and hire verified specialists."
                    : t("auth_role_specialist_hint") ||
                      "Create a profile and get jobs from customers."}
                </p>
              </div>
            )}

            {/* Name (only registration) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth_name")}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("auth_email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("auth_password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  {t("auth_forgot")}
                </button>
              </div>
            )}

            <Button type="submit" className="w-full rounded-xl" size="lg">
              {isLogin ? t("auth_sign_in") : t("auth_sign_up")}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                {t("auth_or")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border hover:bg-secondary transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border hover:bg-secondary transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06C2 17.08 5.657 21.246 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.195 2.238.195v2.476h-1.26c-1.242 0-1.63.776-1.63 1.57v1.89h2.773l-.443 2.91h-2.33V22C18.343 21.246 22 17.08 22 12.06z"
                />
              </svg>
              Facebook
            </button>
          </div>

          <p className="text-center text-muted-foreground mt-8">
            {isLogin ? t("auth_no_account") : t("auth_have_account")}{" "}
            <button
              type="button"
              onClick={() => setIsLogin((v) => !v)}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? t("auth_sign_up") : t("auth_sign_in")}
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div
        className="hidden lg:block flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    </div>
  );
};

export default Auth;