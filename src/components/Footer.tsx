import React from "react";

const footerLinks = {
  services: {
    title: "Services",
    links: [
      { label: "Home Services", href: "#" },
      { label: "Delivery", href: "#" },
      { label: "Freelance", href: "#" },
      { label: "Business", href: "#" },
      { label: "All Categories", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Safety", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
};

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center transition-colors"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-background">
      {/* FULL BLEED */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        {/* ONE BIG DARK BLOCK (tall) */}
        <div className="w-screen bg-[#121212] text-white">
          {/* Make footer taller and keep copyright pinned to bottom */}
          <div className="px-6 md:px-12 lg:px-16 min-h-[520px] md:min-h-[620px] flex flex-col">
            {/* TOP CONTENT */}
            <div className="pt-16 md:pt-20">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-14">
                {/* Logo + tagline + socials */}
                <div className="col-span-2 md:col-span-1">
                  <a href="/" className="flex items-center gap-2 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">T</span>
                    </div>
                    <span className="text-xl font-bold">TaskPro</span>
                  </a>

                  <p className="text-sm text-white/70 mb-8 max-w-[26ch] leading-relaxed">
                    Find trusted professionals for any task. Fast, reliable, hassle-free.
                  </p>

                  {/* SVG Socials */}
                  <div className="flex gap-3">
                    {/* X */}
                    <SocialIcon href="#" label="X">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.3-6.9L4.9 22H2l7.3-8.4L1 2h6.8l4.8 6.2L18.9 2Zm-1.2 18h1.7L7.1 3.9H5.3L17.7 20Z" />
                      </svg>
                    </SocialIcon>

                    {/* LinkedIn */}
                    <SocialIcon href="#" label="LinkedIn">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.62-1.86 3.34-1.86 3.57 0 4.23 2.35 4.23 5.41v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45H7.1V9H3.56v11.45Z" />
                      </svg>
                    </SocialIcon>

                    {/* Facebook */}
                    <SocialIcon href="#" label="Facebook">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                        <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.88h-2.32v6.99A10 10 0 0 0 22 12Z" />
                      </svg>
                    </SocialIcon>

                    {/* Instagram */}
                    <SocialIcon href="#" label="Instagram">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.8 6.2a.8.8 0 1 1-.8-.8.8.8 0 0 1 .8.8Z" />
                      </svg>
                    </SocialIcon>
                  </div>
                </div>

                {/* Links */}
                {Object.values(footerLinks).map((section) => (
                  <div key={section.title}>
                    <h4 className="font-semibold text-white/90 mb-6">{section.title}</h4>
                    <ul className="space-y-4">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-sm text-white/65 hover:text-white transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* PUSH COPYRIGHT TO VERY BOTTOM */}
            <div className="mt-auto pb-4 md:pb-6">
              <p className="text-sm text-white/60">© 2024 TaskPro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;