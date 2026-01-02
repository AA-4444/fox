import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle2 } from "lucide-react";

const features = [
  "Instant notifications for new tasks",
  "Secure in-app messaging",
  "Easy payment processing",
  "Track job progress in real-time",
];

const AppDownload = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4">
        <div className="relative max-w-6xl mx-auto bg-card rounded-[2.5rem] p-8 md:p-16 border border-border/50 shadow-elevated overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get the App
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Thousands of professionals in your pocket. Download our free app and order any service on the go.
              </p>
              
              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Download buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" className="gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 12.5c0-3-2.5-4.5-2.5-4.5s-2.5 1.5-2.5 4.5 2.5 4.5 2.5 4.5 2.5-1.5 2.5-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                  App Store
                </Button>
                <Button variant="heroOutline" size="lg" className="gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.807 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.801 8.99l-2.302 2.302-8.635-8.634z"/>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            
            {/* Phone mockup */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-64 h-[500px] bg-foreground rounded-[3rem] p-3 shadow-elevated">
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden flex items-center justify-center">
                  <div className="text-center p-6">
                    <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold">TaskPro</p>
                    <p className="text-sm text-muted-foreground">Get things done</p>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
