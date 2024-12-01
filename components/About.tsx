import {
  BeakerIcon,
  TruckIcon,
  GlobeAltIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          À Propos de Biomedis
        </h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12">
          Biomedis est un fournisseur leader de réactifs de laboratoire, de
          distribution d&apos;équipements, de services de tourisme médical et
          d&apos;assistance pour les études médicales à l&apos;étranger au Mali.
          Notre mission est d&apos;améliorer la qualité des soins de santé et de
          l&apos;éducation médicale grâce à des solutions et des partenariats
          innovants.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: BeakerIcon, text: "Réactifs de Laboratoire" },
            { icon: TruckIcon, text: "Distribution d&apos;Équipements" },
            { icon: GlobeAltIcon, text: "Tourisme Médical" },
            {
              icon: AcademicCapIcon,
              text: "Études Médicales à l&apos;Étranger",
            },
          ].map((item, index) => (
            <Card key={index} className="w-64">
              <CardContent className="flex flex-col items-center p-6">
                <item.icon className="w-16 h-16 text-blue-600 mb-4" />
                <span className="text-lg font-semibold">{item.text}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
