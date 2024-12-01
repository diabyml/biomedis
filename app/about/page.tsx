import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Handshake, Target, Award } from "lucide-react";
import { getPartnersData } from "@/lib/server-utils";
import Teams from "@/components/Teams";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website_url?: string;
}

export default async function AboutPage() {
  const partners = await getPartnersData();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          À Propos de Biomedis
        </h1>

        {/* Company History and Mission */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <History className="mr-2" />
                Notre Histoire et Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <Image
                    src={
                      "https://ybkutcnzwagfjeqojvew.supabase.co/storage/v1/object/public/images/biomedis.jpg?t=2024-12-01T11%3A48%3A28.569Z"
                    }
                    alt="Biomedis History"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="mb-4">
                    Fondée en 2024 à Bamako, Biomedis est une entreprise
                    nouvelle et ambitieuse, dédiée à transformer le secteur de
                    la santé au Mali. Spécialisée dans la distribution
                    d&#39;équipements de laboratoire, l&#39;installation de
                    matériel médical et le tourisme médical, Biomedis vise à
                    devenir un acteur incontournable dans ces domaines.
                  </p>
                  <p className="font-semibold">
                    Notre mission : Révolutionner les soins de santé au Mali en
                    proposant des solutions innovantes et en forgeant des
                    partenariats stratégiques à l&#39;échelle mondiale. Nous
                    nous engageons à réduire le fossé technologique dans le
                    domaine médical, permettant aux professionnels de santé
                    maliens d&#39;accéder aux outils et aux connaissances les
                    plus avancés au niveau international.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team or Leadership Overview */}
        <Teams />

        {/* Partnerships */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Handshake className="mr-2" />
                Nos Partenariats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-8">
                Biomedis a établi des partenariats solides avec des entreprises
                leaders mondiales dans le domaine des équipements de laboratoire
                et des technologies médicales. Ces collaborations nous
                permettent d&apos;offrir à nos clients les produits les plus
                innovants et les plus fiables du marché.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {partners.map((partner: Partner) => (
                  <Card
                    key={partner.id}
                    className="w-48 h-24 flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  >
                    <CardContent className="p-0 flex items-center justify-center">
                      <Image
                        src={partner.logo_url}
                        alt={`${partner.name} logo`}
                        width={160}
                        height={80}
                        className="object-contain"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core Values and Goals */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Award className="mr-2" />
                Nos Valeurs Fondamentales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    <strong>Intégrité :</strong> Nous agissons avec honnêteté et
                    transparence dans toutes nos interactions.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    <strong>Innovation :</strong> Nous recherchons constamment
                    de nouvelles solutions pour améliorer les soins de santé.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    <strong>Qualité :</strong> Nous nous engageons à fournir des
                    produits et services de la plus haute qualité.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    <strong>Satisfaction client :</strong> Nous plaçons les
                    besoins de nos clients au cœur de tout ce que nous faisons.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="mr-2" />
                Nos Objectifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    Étendre notre présence dans toute l&apos;Afrique de
                    l&apos;Ouest d&apos;ici 2025.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    Développer des partenariats avec des institutions de
                    recherche médicale internationales.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    Lancer un programme de formation continue pour les
                    professionnels de santé maliens.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></span>
                  <div>
                    Contribuer à la réduction de 30% des coûts
                    d&apos;importation d&apos;équipements médicaux au Mali
                    d&apos;ici 2027.
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
