import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section
      className="py-24 text-foreground"
      style={{
        background:
          "linear-gradient(90deg, rgba(20,168,0,1) 0%, rgba(87,199,133,0.92) 18%, rgba(237,221,83,1) 100%)",
      }}
    >
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>

          <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of people who use our platform to find trusted
            professionals and get things done.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-background text-foreground hover:bg-background/90 rounded-full group"
            >
              Post a Task
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="ghost"
              size="xl"
              className="border border-foreground/30 text-foreground hover:bg-foreground/10 rounded-full"
            >
              Become a Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
