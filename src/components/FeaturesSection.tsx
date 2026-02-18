import {
  Brain,
  Stethoscope,
  Zap,
  ImageIcon,
  MousePointerClick,
  ShieldCheck,
  Activity,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description:
      "Leverages state-of-the-art convolutional neural networks trained on thousands of dermatological images to identify skin conditions accurately.",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: Stethoscope,
    title: "Medical Diagnostic Model",
    description:
      "Built on clinically validated datasets used in dermatology research, ensuring medically meaningful predictions across disease categories.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Zap,
    title: "Fast & Accurate Results",
    description:
      "Receive AI-generated analysis in under 3 seconds. Our optimized inference pipeline ensures rapid yet reliable classification of skin conditions.",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: ImageIcon,
    title: "Image-Based Analysis",
    description:
      "Simply upload a clear photograph of the affected area. No special equipment needed — just a standard smartphone or digital camera.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: MousePointerClick,
    title: "User-Friendly Interface",
    description:
      "Designed with simplicity in mind. Drag-and-drop upload, instant previews, and clear results make DermAI accessible to everyone.",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private Uploads",
    description:
      "Your images are processed securely and never stored without consent. Privacy is a core principle of everything we build.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Activity,
    title: "Real-Time Prediction",
    description:
      "Watch the AI analyze your image in real-time with live processing indicators, giving you transparency into the analysis pipeline.",
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    icon: BookOpen,
    title: "Detailed Disease Information",
    description:
      "Alongside the AI result, access comprehensive descriptions of each disease category — symptoms, appearance, and when to seek care.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary/20">
            <Brain className="w-4 h-4 text-primary" />
            Why DermAI
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful Features for{" "}
            <span className="gradient-text">Skin Health</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            DermAI combines cutting-edge AI with an intuitive interface to bring dermatological analysis to your fingertips — anytime, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2 text-base">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
