import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-blue-600 text-white">
      <div className="absolute inset-0   opacity-20"></div>
      <div className="relative container max-w-screen-lg mx-auto px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Solutions de Laboratoire Innovantes pour la Santé Moderne
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Autonomiser les professionnels de santé avec des équipements et
          services de pointe au Mali et au-delà.
        </p>
        <div className="space-x-4">
          <Button asChild variant="secondary">
            <Link href="/products-services">Explorer les Produits</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Nous Contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
