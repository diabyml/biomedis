/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
}

async function getFaqs() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore as any,
    });

    const { data: faqs, error } = await supabase
      .from("faqs")
      .select("*")
      .order("order_index");

    if (error) {
      console.error("Error fetching FAQs:", error.message);
      return [];
    }

    return faqs || [];
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return [];
  }
}

export default async function FAQ() {
  const faqs = await getFaqs();

  if (!faqs.length) {
    return null; // Don't render the section if there are no FAQs
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Foire Aux Questions (FAQ)
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq: FAQ) => (
            <AccordionItem value={faq.id} key={faq.id}>
              <AccordionTrigger className="text-left">
                <span className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 flex-shrink-0 transition-transform duration-200" />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
          <p className="mb-4 text-lg">Vous avez d&apos;autres questions ?</p>
          <Button asChild>
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
