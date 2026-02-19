import { Target, Heart, Users, Award } from "lucide-react";

const values = [
{
  icon: Target,
  title: "Our Mission",
  description:
  "To make preliminary skin health analysis accessible to everyone through the power of artificial intelligence — bridging the gap between patients and dermatological care."
},
{
  icon: Heart,
  title: "Patient First",
  description:
  "Every feature we build centers around the patient experience. We prioritize clarity, accessibility, and emotional reassurance in our design."
},
{
  icon: Users,
  title: "For Everyone",
  description:
  "Whether you're a patient, caregiver, or medical student, DermAI is designed to be useful, intuitive, and informative for all users."
},
{
  icon: Award,
  title: "Research-Backed",
  description:
  "Our model is trained on validated dermatological datasets used in peer-reviewed medical research, ensuring clinical relevance."
}];


const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20">
              About DermAI
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              Bringing{" "}
              <span className="gradient-text">AI Intelligence</span> to Skin Health
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                DermAI was developed to address a critical gap in healthcare accessibility — the difficulty many people face in getting timely dermatological assessments. With AI, we can provide a meaningful first step in understanding skin conditions.
              </p>
              <p>
                Our deep learning model has been trained to recognize patterns in skin lesion images across 10 of the most common dermatological categories. This is made possible through advances in computer vision and medical imaging AI.
              </p>
              <p>
                <strong className="text-foreground">Important:</strong> DermAI is an educational tool. It does not replace a qualified dermatologist. Always seek professional medical advice for any skin concerns.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
              { value: "10", label: "Disease Categories" },
              { value: "99%", label: "Uptime" },
              { value: "<3s", label: "Analysis Time" }].
              map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, description }) =>
            <div
              key={title}
              className="bg-background border border-border rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300">

                <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default AboutSection;