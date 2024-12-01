import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à Améliorer vos Services de Santé ?
        </h2>
        <p className="text-xl mb-8">
          Découvrez comment Biomedis peut soutenir votre établissement médical
          avec des équipements et services de pointe.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/contact">Contactez-nous</Link>
        </Button>
      </div>
    </section>
  );
}
