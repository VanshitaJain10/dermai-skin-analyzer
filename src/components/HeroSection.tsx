import { ArrowDown, ShieldCheck, Zap, Brain, Upload, Scan, CheckCircle } from "lucide-react";

const stats = [
  { icon: Brain, label: "AI Model", value: "Deep Learning" },
  { icon: Zap, label: "Analysis Speed", value: "< 3 Seconds" },
  { icon: ShieldCheck, label: "Privacy", value: "100% Secure" },
];

const PhoneMockup = () => (
  <div className="relative flex items-center justify-center">
    {/* Glow behind phone */}
    <div className="absolute w-72 h-72 rounded-full bg-primary/15 blur-3xl" />

    {/* Phone frame */}
    <div className="relative w-64 h-[520px] bg-card border-2 border-border rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 40px 80px -20px hsl(var(--primary)/0.25), 0 0 0 1px hsl(var(--border))" }}>

      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-card">
        <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
        <div className="w-20 h-5 bg-foreground/10 rounded-full" />
        <div className="flex gap-1">
          <div className="w-3 h-2 bg-foreground/20 rounded-sm" />
          <div className="w-2 h-2 bg-foreground/20 rounded-full" />
        </div>
      </div>

      {/* App header */}
      <div className="px-4 py-3 border-b border-border bg-card">
        <p className="text-[11px] font-bold text-primary tracking-widest uppercase">DermAI</p>
        <p className="text-xs text-muted-foreground">Skin Analysis</p>
      </div>

      {/* Upload area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 bg-accent/30">
        <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center gap-2">
          <Upload className="w-8 h-8 text-primary/60" />
          <p className="text-[9px] text-muted-foreground text-center leading-tight">Tap to upload<br />skin image</p>
        </div>

        <div className="w-full space-y-2 mt-2">
          {[
            { icon: Scan, label: "Analyzing lesion...", done: true },
            { icon: CheckCircle, label: "Disease detected", done: true },
          ].map(({ icon: Icon, label, done }) => (
            <div key={label} className="flex items-center gap-2 bg-card rounded-xl px-3 py-2 border border-border">
              <Icon className={`w-3.5 h-3.5 ${done ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-[10px] text-foreground">{label}</span>
              {done && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </div>

      {/* Result pill */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="bg-primary/10 rounded-xl px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-semibold text-primary">Eczema – 94.2% confidence</span>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center py-2 bg-card">
        <div className="w-20 h-1 bg-foreground/20 rounded-full" />
      </div>
    </div>

    {/* Floating badge */}
    <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-xs font-semibold text-foreground">AI Ready</span>
    </div>

    {/* Floating accuracy badge */}
    <div className="absolute -bottom-2 -left-4 bg-primary rounded-2xl px-3 py-2 shadow-lg">
      <span className="text-xs font-bold text-primary-foreground">94%+ Accuracy</span>
    </div>
  </div>
);

const HeroSection = () => {
  const scrollToUpload = () => {
    document.querySelector("#upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-background">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-secondary/5" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/4 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-secondary/8 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-up">
              Upload a Skin Image for{" "}
              <span className="gradient-text">AI-Based Disease</span>{" "}
              Detection
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-up mx-auto lg:mx-0" style={{ animationDelay: "0.1s" }}>
              DermAI uses advanced deep learning to analyze skin lesions and identify potential conditions from 10 disease categories — instantly and privately.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.2s" }}>
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
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-card/80 backdrop-blur-sm border border-border rounded-xl px-3 py-3 card-shadow flex flex-col items-center gap-2 text-center">
                  <div className="bg-accent rounded-lg p-1.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
                    <p className="text-xs font-semibold text-foreground leading-tight">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <PhoneMockup />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
