import { BeakerIcon, CogIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Services() {
  const services = [
    {
      icon: BeakerIcon,
      title: "Distribution de Produits",
      description:
        "Nous distribuons des réactifs de laboratoire et des équipements de haute qualité aux établissements de santé à travers le Mali.",
    },
    {
      icon: CogIcon,
      title: "Installation & Maintenance",
      description:
        "Notre équipe d'experts fournit des services professionnels d'installation et de maintenance pour tous les équipements distribués.",
    },
    {
      icon: GlobeAltIcon,
      title: "Études Médicales à l'Étranger",
      description:
        "Nous facilitons le tourisme médical et les études à l'étranger, en mettant en relation les étudiants maliens avec des établissements d'enseignement internationaux.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
