import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    avatar: "SJ",
    rating: 5,
    text: "Found an amazing plumber within 10 minutes. He fixed my emergency leak the same day. The platform makes everything so simple and transparent.",
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    avatar: "MC",
    rating: 5,
    text: "We use this service for all our office maintenance needs. The quality of professionals is consistently high, and the pricing is always fair.",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    avatar: "ER",
    rating: 5,
    text: "As a service provider, this platform has been incredible for growing my client base. The interface is clean, and payments are always on time.",
  },
  {
    name: "David Park",
    role: "Property Manager",
    avatar: "DP",
    rating: 5,
    text: "Managing multiple properties is so much easier now. I can quickly find reliable help for any job, from cleaning to electrical work.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* ===== SVG WAVE BACKGROUND ===== */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[220px]"
        >
          <path
            fill="#14A800"
            d="M0,160L40,186.7C80,213,160,267,240,266.7C320,267,400,213,480,197.3C560,181,640,203,720,197.3C800,192,880,160,960,160C1040,160,1120,192,1200,213.3C1280,235,1360,245,1400,250.7L1440,256L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community has to say about their experience
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-card rounded-3xl p-8 border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              {/* Quote */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="leading-relaxed mb-6">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
