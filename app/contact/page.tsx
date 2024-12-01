"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^\+?[0-9\s-]{8,}$/;

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Veuillez entrer votre nom");
      return false;
    }

    if (!form.email.trim() || !EMAIL_REGEX.test(form.email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return false;
    }

    if (form.phone.trim() && !PHONE_REGEX.test(form.phone)) {
      toast.error("Format de téléphone invalide. Exemple: +223 20223344");
      return false;
    }

    if (!form.message.trim() || form.message.length < 10) {
      toast.error("Veuillez entrer un message d'au moins 10 caractères");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Remove any leading/trailing whitespace and handle empty phone
      const cleanedForm = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null, // Set to null if empty
        message: form.message.trim(),
      };

      const { error } = await supabase
        .from("contact_submissions")
        .insert(cleanedForm);

      if (error) {
        console.error("Contact submission error:", error.message);
        if (error.message.includes("valid_phone")) {
          toast.error("Format de téléphone invalide. Exemple: +223 20223344");
        } else {
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
        return;
      }

      toast.success("Votre message a été envoyé avec succès!");
      setForm(initialForm);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="py-16 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Nous sommes là pour répondre à toutes vos questions. N&apos;hésitez
            pas à nous contacter.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nom complet *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Votre nom complet"
                    className="bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="votre@email.com"
                    className="bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="+223 XX XX XX XX"
                    className="bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="Votre message (minimum 10 caractères)"
                    className="min-h-[150px] bg-white"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer"
                  )}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Nos Coordonnées</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span>contact@biomedis.ml</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span>+223 60 23 72 85</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <span>Golf, Bamako, Mali</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Notre Emplacement
                </h3>
                <div className="aspect-video w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15432.948894802!2d-8.008506!3d12.649303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51cd4fe8c78d97%3A0xb0f9650d5f771cc0!2sBamako%2C%20Mali!5e0!3m2!1sen!2sus!4v1652893681243!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
