import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProductCategoriesData, getProductsData } from "@/lib/server-utils";
import { CogIcon, GlobeIcon, GraduationCapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Services data
const servicesData = [
  {
    id: 1,
    title: "Installation et Maintenance",
    description:
      "Service professionnel d'installation et de maintenance pour tous les équipements de laboratoire",
    icon: CogIcon,
  },
  {
    id: 2,
    title: "Assistance au Tourisme Médical",
    description:
      "Accompagnement complet pour les patients cherchant des traitements médicaux à l'étranger",
    icon: GlobeIcon,
  },
  {
    id: 3,
    title: "Programmes d'Études Médicales",
    description:
      "Support pour les professionnels de santé souhaitant poursuivre des études médicales à l'étranger",
    icon: GraduationCapIcon,
  },
];

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  product_categories: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default async function ProductsServicesPage() {
  const products = await getProductsData();
  const categories = await getProductCategoriesData();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* Introduction Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Explorez Nos Produits & Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de produits de laboratoire de haute
            qualité et nos services de santé exceptionnels. Chez Biomedis, nous
            nous engageons à fournir des solutions innovantes pour répondre à
            vos besoins en matière de soins de santé et de recherche médicale.
          </p>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              className="md:w-2/3"
            />
            <Select>
              <SelectTrigger className="md:w-1/3">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category: Category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Nos Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="aspect-video relative mb-4">
                    <Image
                      src={
                        product.image_url || "/images/products/placeholder.jpg"
                      }
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-2">
                    {product.product_categories.name}
                  </p>
                  <p className="text-gray-700">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/contact">Demander un Devis</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">En Savoir Plus</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Besoin de plus d&apos;informations ?
          </h2>
          <p className="text-xl mb-8">
            Notre équipe est là pour répondre à toutes vos questions sur nos
            produits et services.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
