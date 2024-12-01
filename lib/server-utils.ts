/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getPartnersData() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore as any,
    });

    const { data: partners, error } = await supabase
      .from("partners")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching partners:", error.message);
      return [];
    }

    return partners || [];
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

export async function getTestimonialsData() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore as any,
    });

    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error.message);
      return [];
    }

    return testimonials || [];
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}

export async function getProductsData() {
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
      .order("name");

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

export async function getProductCategoriesData() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore as any,
    });

    const { data: categories, error } = await supabase
      .from("product_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching product categories:", error.message);
      return [];
    }

    return categories || [];
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
    return [];
  }
}
