"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, GraduationCap, Plane, Stethoscope } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

// Initialize Supabase client
//const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
  phone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

export default function MedicalTourismPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([values]);

      if (error) throw error;

      toast.success(
        "Demande envoyée avec succès! Nous vous contacterons bientôt."
      );
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Introduction Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container  max-w-screen-xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Améliorer les Soins de Santé par le Tourisme Médical
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Biomedis vous connecte aux meilleures opportunités de soins de santé
            dans le monde entier. Que vous soyez patient à la recherche de
            traitements avancés ou professionnel de santé cherchant à élargir
            vos compétences, nous sommes là pour vous guider à chaque étape.
          </p>
        </div>
      </section>

      {/* Travel Services for Patients */}
      <section className="py-16">
        <div className="container  max-w-screen-lg mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Services de Voyage pour les Patients
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Biomedis vous accompagne dans votre parcours de soins à
                l&apos;étranger. Nous vous aidons à accéder aux traitements
                médicaux avancés dans des hôpitaux de renommée mondiale.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Plane className="mr-2 text-blue-600" />
                  Assistance pour les visas médicaux
                </li>
                <li className="flex items-center">
                  <Building className="mr-2 text-blue-600" />
                  Réservations d&apos;hôtels à proximité des hôpitaux
                </li>
                <li className="flex items-center">
                  <Stethoscope className="mr-2 text-blue-600" />
                  Coordination avec les équipes médicales internationales
                </li>
              </ul>
            </div>
            <div className="mt-8 md:mt-0">
              <Image
                src={
                  "https://ybkutcnzwagfjeqojvew.supabase.co/storage/v1/object/public/images/travel.jpeg?t=2024-12-01T13%3A31%3A00.717Z"
                }
                alt="Medical Travel"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Study Programs for Professionals */}
      <section className="bg-gray-100 py-16">
        <div className="container max-w-screen-lg mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Programmes d&apos;Études pour les Étudiants
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Image
                src={
                  "https://ybkutcnzwagfjeqojvew.supabase.co/storage/v1/object/public/images/studies.jpeg?t=2024-12-01T13%3A33%3A22.333Z"
                }
                alt="Medical Education"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="mb-4">
                Enrichissez votre parcours académique avec nos programmes
                d&apos;études à l&apos;étranger. Nous collaborons avec des
                institutions de premier plan pour offrir des opportunités
                uniques de formation et de recherche.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <GraduationCap className="mr-2 text-blue-600" />
                  Stages pratiques dans des organisations internationales
                </li>
                <li className="flex items-center">
                  <GraduationCap className="mr-2 text-blue-600" />
                  Programmes de recherche avancée dans divers domaines
                </li>
                <li className="flex items-center">
                  <GraduationCap className="mr-2 text-blue-600" />
                  Formations spécialisées en nouvelles technologies et
                  innovations
                </li>
              </ul>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Comment postuler :</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Vérifiez votre éligibilité sur notre site web</li>
                  <li>Préparez votre CV et lettre de motivation</li>
                  <li>
                    Soumettez votre candidature via notre formulaire en ligne
                  </li>
                  <li>Passez un entretien avec notre équipe de sélection</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16">
        <div className="container max-w-screen-lg mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Nos Partenariats Internationaux
          </h2>
          <p className="text-center mb-8">
            Biomedis collabore avec des institutions de santé de renommée
            mondiale pour offrir les meilleures opportunités à nos patients et
            professionnels.
          </p>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map((partner) => (
              <div key={partner} className="bg-white p-4 rounded-lg shadow-md">
                <Image
                  src={
                    IMAGES.medicalTourism.partners[
                      partner % IMAGES.medicalTourism.partners.length
                    ]
                  }
                  alt={`Partner Hospital ${partner}`}
                  width={200}
                  height={150}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Contact Form and CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container max-w-screen-lg mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Laissez-nous Vous Guider dans Votre Parcours Médical
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
              <CardHeader>
                <CardTitle>Contactez-nous</CardTitle>
                <CardDescription>
                  Nous sommes là pour répondre à toutes vos questions sur le
                  tourisme médical.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Votre adresse e-mail"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Votre numéro de téléphone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Détails de votre demande"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Pourquoi Choisir Biomedis ?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-green-500">✓</span>
                  <span>
                    Expertise dans la coordination des soins internationaux
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-green-500">✓</span>
                  <span>
                    Partenariats avec des hôpitaux de renommée mondiale
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-green-500">✓</span>
                  <span>
                    Assistance personnalisée tout au long de votre parcours
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-green-500">✓</span>
                  <span>
                    Programmes d&apos;études médicales uniques pour les
                    professionnels
                  </span>
                </li>
              </ul>
              <Link href={"/products-services"}>
                <Button className="w-full mt-6" size="lg">
                  Découvrez Nos Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
