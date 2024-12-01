import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPartnersData } from "@/lib/server-utils";

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website_url?: string;
}

export default async function Partners() {
  const partners = await getPartnersData();

  return (
    <section id="partners" className="py-16">
      <div className="container max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Reconnu par les Leaders Mondiaux de la Santé
        </h2>
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
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/partners">Voir tous nos partenaires</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
