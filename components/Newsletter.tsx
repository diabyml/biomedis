"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email, is_active: true }]);

      if (error) {
        if (error.code === "23505") {
          toast.error(
            "Cette adresse email est déjà inscrite à notre newsletter"
          );
        } else {
          console.error("Newsletter subscription error:", error);
          toast.error(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
        return;
      }

      toast.success("Merci de vous être abonné à notre newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
      <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
        <Input
          type="email"
          placeholder="Votre adresse email"
          className="text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription...
            </>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </div>
  );
}
