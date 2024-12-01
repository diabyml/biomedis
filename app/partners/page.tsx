/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  website_url?: string;
  created_at?: string;
}

async function getPartners() {
  const supabase = createServerComponentClient({ cookies });
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching partners:", error);
    return [];
  }

  return partners as Partner[];
}

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Nos Partenaires</h1>
          <p className="text-xl text-gray-600">
            Des collaborations stratégiques pour améliorer la santé en Afrique
          </p>
        </div>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner: Partner) => (
              <Card key={partner.id} className="flex flex-col overflow-hidden">
                <CardHeader className="flex-1 p-6">
                  <div className="h-32 flex items-center justify-center bg-white rounded-lg mb-4">
                    <Image
                      src={partner.logo_url}
                      alt={`${partner.name} logo`}
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <CardTitle>{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{partner.description}</p>
                </CardContent>
                {partner.website_url && (
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={partner.website_url} target="_blank">
                        Visiter le site
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/contact">Devenir Partenaire</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
