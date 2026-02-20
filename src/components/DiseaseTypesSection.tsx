import { Info } from "lucide-react";
import eczema from "../assets/eczema.jpg";

const diseases = [
	{
		name: "Eczema",
		shortName: "ECZ",
		description:
			"A chronic inflammatory skin condition causing itchy, red, cracked and rough skin patches. Often flares periodically.",
		color: "from-blue-100 to-blue-200",
		textColor: "text-blue-700",
		badgeColor: "bg-blue-100 text-blue-600",
		image: eczema,
	},
	{
		name: "Warts, Molluscum & Viral Infections",
		shortName: "WMV",
		description:
			"Skin growths and lesions caused by viral infections including HPV and Molluscum contagiosum viruses.",
		color: "from-purple-100 to-purple-200",
		textColor: "text-purple-700",
		badgeColor: "bg-purple-100 text-purple-600",
	},
	{
		name: "Melanoma",
		shortName: "MEL",
		description:
			"The most serious type of skin cancer developing in melanocytes. Early detection is critical for successful treatment.",
		color: "from-red-100 to-red-200",
		textColor: "text-red-700",
		badgeColor: "bg-red-100 text-red-600",
	},
	{
		name: "Atopic Dermatitis",
		shortName: "ATD",
		description:
			"A long-term skin condition making the skin itchy, inflamed, and prone to infections. Related to eczema.",
		color: "from-orange-100 to-orange-200",
		textColor: "text-orange-700",
		badgeColor: "bg-orange-100 text-orange-600",
	},
	{
		name: "Basal Cell Carcinoma (BCC)",
		shortName: "BCC",
		description:
			"The most common form of skin cancer, arising from basal cells. Rarely metastasizes but can cause local damage.",
		color: "from-rose-100 to-rose-200",
		textColor: "text-rose-700",
		badgeColor: "bg-rose-100 text-rose-600",
	},
	{
		name: "Melanocytic Nevi (NV)",
		shortName: "NVI",
		description:
			"Commonly known as moles. Benign pigmented lesions composed of melanocytes. Most are harmless but require monitoring.",
		color: "from-amber-100 to-amber-200",
		textColor: "text-amber-700",
		badgeColor: "bg-amber-100 text-amber-600",
	},
	{
		name: "Benign Keratosis-like Lesions (BKL)",
		shortName: "BKL",
		description:
			"Non-cancerous growths including seborrheic keratosis and solar lentigo. Common in older adults.",
		color: "from-green-100 to-green-200",
		textColor: "text-green-700",
		badgeColor: "bg-green-100 text-green-600",
	},
	{
		name: "Psoriasis & Lichen Planus",
		shortName: "PSO",
		description:
			"Autoimmune conditions causing thick, scaly skin patches. Psoriasis affects 2–3% of the global population.",
		color: "from-teal-100 to-teal-200",
		textColor: "text-teal-700",
		badgeColor: "bg-teal-100 text-teal-600",
	},
	{
		name: "Seborrheic Keratoses & Benign Tumors",
		shortName: "SKT",
		description:
			"Common benign skin growths that appear as waxy, scaly, slightly raised brown or tan patches on the skin.",
		color: "from-cyan-100 to-cyan-200",
		textColor: "text-cyan-700",
		badgeColor: "bg-cyan-100 text-cyan-600",
	},
	{
		name: "Tinea (Ringworm)",
		shortName: "TIN",
		description:
			"A fungal infection causing ring-shaped, red, itchy patches on the skin. Highly treatable with antifungal medications.",
		color: "from-indigo-100 to-indigo-200",
		textColor: "text-indigo-700",
		badgeColor: "bg-indigo-100 text-indigo-600",
	},
];

const DiseaseTypesSection = () => {
	return (
		<section id="disease-types" className="py-20 bg-muted/40">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-14">
					<div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary/20">
						<Info className="w-4 h-4 text-primary" />
						Supported Conditions
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
						10 Skin Disease <span className="gradient-text">Categories</span>
					</h2>
					<p className="text-muted-foreground max-w-xl mx-auto">
						DermAI can identify and classify these ten dermatological conditions
						from uploaded skin lesion photographs.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
					{diseases.map((disease) => (
						<div
							key={disease.name}
							className="bg-card border border-border rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group flex flex-col"
						>
							{/* Image Placeholder */}
							<div className="h-40 w-full overflow-hidden">
								<img
									src={disease.image}
									alt={disease.name}
									className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
								/>
							</div>
							{/* Content */}
							<div className="p-5 flex flex-col flex-1">
								<div className="flex items-start justify-between gap-2 mb-2">
									<h3 className="font-heading font-bold text-foreground text-sm leading-tight">
										{disease.name}
									</h3>
								</div>
								<p className="text-muted-foreground text-xs leading-relaxed flex-1">
									{disease.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default DiseaseTypesSection;
