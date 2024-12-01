"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Tangara Mamary",
    role: "Fondateur et PDG",
    specialty: "Spécialiste en biologie médicale",
  },
  {
    id: 2,
    name: "Mme Fatoumata Bah",
    role: "Directrice des Opérations",
    specialty:
      "Biologiste Experte en gestion de la chaîne d'approvisionnement médicale",
  },
];

export default function Teams() {
  return (
    <section className="mb-16">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Users className="mr-2" />
            Notre Équipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-8">
            L&apos;équipe de direction de Biomedis est composée d&apos;experts
            en biologie médicale et en technologie de la santé. Avec plus de 50
            ans d&apos;expérience cumulée, notre équipe apporte une profonde
            compréhension des défis et des opportunités du secteur de la santé
            au Mali.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full overflow-hidden">
                  <Image
                    src={
                      "https://ybkutcnzwagfjeqojvew.supabase.co/storage/v1/object/public/images/avatar.jpg"
                    }
                    alt={member.name}
                    width={128}
                    height={128}
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                {member.specialty && (
                  <p className="text-sm text-gray-500">{member.specialty}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
