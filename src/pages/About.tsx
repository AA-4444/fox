import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Shield, Target } from "lucide-react";
import CTASection from "@/components/CTASection";

import aboutBg from "@/assets/about.jpg";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "People First",
      desc: "We put our community of users and professionals at the center of everything we do.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Safety",
      desc: "We verify every professional and protect every transaction.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      desc: "We're building a community where everyone can thrive.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Excellence",
      desc: "We strive for excellence in everything we create.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-16">
        {/* ================= HERO (FULL SCREEN IMAGE) ================= */}
        <section className="relative w-full h-[100dvh] overflow-hidden">
          {/* background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${aboutBg})` }}
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

          {/* content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 pt-16 md:pt-20">
            <div className="max-w-3xl text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About TaskPro
              </h1>

              <p className="text-lg md:text-xl text-white/80">
                We're on a mission to connect people with trusted professionals
                who can help them get things done.
              </p>
            </div>
          </div>
        </section>

        {/* ================= STORY ================= */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    TaskPro was born from a simple idea: finding reliable help
                    shouldn't be hard. Our founders experienced firsthand the
                    frustration of trying to find trustworthy professionals for
                    everyday tasks.
                  </p>
                  <p>
                    In 2020, we launched TaskPro to create a platform where people
                    could easily connect with verified professionals in their
                    area.
                  </p>
                  <p>
                    Today, TaskPro is home to over 150,000 professionals across
                    hundreds of service categories.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-2xl p-8 text-center">
                  <p className="text-4xl font-bold text-primary">2020</p>
                  <p className="text-sm text-muted-foreground">Founded</p>
                </div>
                <div className="bg-primary/10 rounded-2xl p-8 text-center">
                  <p className="text-4xl font-bold text-primary">2.5M+</p>
                  <p className="text-sm text-muted-foreground">
                    Tasks Completed
                  </p>
                </div>
                <div className="bg-primary/10 rounded-2xl p-8 text-center">
                  <p className="text-4xl font-bold text-primary">150K+</p>
                  <p className="text-sm text-muted-foreground">
                    Professionals
                  </p>
                </div>
                <div className="bg-primary/10 rounded-2xl p-8 text-center">
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Cities</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="py-24 bg-secondary/30">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Values
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border/50 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
};

export default About;