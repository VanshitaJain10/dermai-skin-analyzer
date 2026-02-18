import { Microscope, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="gradient-primary w-9 h-9 rounded-lg flex items-center justify-center">
                <Microscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-extrabold text-xl text-background">
                Derm<span className="text-primary-foreground opacity-70">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-background/60 max-w-xs">
              AI-powered skin disease analysis tool. For educational purposes only. Not a substitute for professional medical advice.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-background mb-4 text-sm">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "Features", "Disease Types", "About", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.querySelector(`#${item.toLowerCase().replace(/ /g, "-")}`)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-background mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Disclaimer", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-background/60 cursor-pointer hover:text-background transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} DermAI. All rights reserved. For educational use only.
          </p>
          <p className="text-xs text-background/40 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400" /> for better skin health awareness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
