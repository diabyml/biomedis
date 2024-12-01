/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  product_categories: {
    id: string;
    name: string;
  };
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore as any,
    });

    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
        *,
        product_categories (
          id,
          name
        )
      `
      )
      .limit(4)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }

    return products || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Products() {
  const products = await getFeaturedProducts();

  if (!products.length) {
    return null;
  }

  return (
    <section id="products-services" className="bg-gray-50 py-16">
      <div className="container max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Produits Vedettes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <div className="aspect-video relative">
                <Image
                  src={product.image_url || "/images/products/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-grow p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.product_categories.name}
                </p>
                <p className="text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </CardContent>
              {/* <CardFooter className="pt-0">
                <Button asChild className="w-full">
                  <Link href="/products-services">En savoir plus</Link>
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link href="/products-services">Voir tous nos produits</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
