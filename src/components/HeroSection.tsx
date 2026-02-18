import { ArrowDown, ShieldCheck, Zap, Brain } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const stats = [
{ icon: Brain, label: "AI Model", value: "Deep Learning" },
{ icon: Zap, label: "Analysis Speed", value: "< 3 Seconds" },
{ icon: ShieldCheck, label: "Privacy", value: "100% Secure" }];


const HeroSection = () => {
  const scrollToUpload = () => {
    document.querySelector("#upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16">

      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto sm:px-6 lg:px-8 relative z-10 px-[2px] py-[80px]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-up">
            Upload a Skin Image for{" "}
            <span className="gradient-text">AI-Based Disease</span>{" "}
            Detection
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            DermAI uses advanced deep learning to analyze skin lesions and identify potential conditions from 10 disease categories — instantly and privately.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <button
              onClick={scrollToUpload}
              className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-base shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-200">

              Analyze My Skin Image
            </button>
            <button
              onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-card text-foreground border border-border px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-accent hover:border-primary/30 transition-all duration-200">

              Learn How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {stats.map(({ icon: Icon, label, value }) =>
            <div
              key={label}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl px-6 py-4 card-shadow flex items-center gap-3">

                <div className="bg-accent rounded-lg p-2 flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              </div>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center animate-bounce">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;