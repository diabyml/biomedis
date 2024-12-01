"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IMAGES } from "@/lib/image-constants";

// Dummy data for news posts
const newsData = [
  {
    id: 1,
    title: "Nouveau Matériel de Laboratoire",
    date: "2023-10-15",
    image: IMAGES.news.labEquipment,
    excerpt:
      "Biomedis s&apos;équipe des dernières technologies en matière d&apos;équipement de laboratoire...",
    category: "Company Announcements",
  },
  {
    id: 2,
    title: "Partenariat Stratégique",
    date: "2023-10-10",
    image: IMAGES.news.partnership,
    excerpt:
      "Signature d&apos;un accord majeur avec un leader européen des équipements médicaux...",
    category: "Industry News",
  },
  {
    id: 3,
    title: "Webinaire sur les Innovations",
    date: "2023-10-05",
    image: IMAGES.news.webinar,
    excerpt:
      "Rejoignez-nous pour un webinaire passionnant sur les dernières innovations...",
    category: "Events & Achievements",
  },
  {
    id: 4,
    title: "Prix d&apos;Excellence",
    date: "2023-09-30",
    image: IMAGES.news.award,
    excerpt:
      "Biomedis reçoit un prix pour sa contribution au secteur médical africain...",
    category: "Events & Achievements",
  },
  {
    id: 5,
    title: "Nouvelle Recherche",
    date: "2023-09-25",
    image: IMAGES.news.research,
    excerpt:
      "Découverte prometteuse dans notre département de recherche et développement...",
    category: "Industry News",
  },
];

export default function NewsUpdatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredNews = useMemo(() => {
    return newsData.filter(
      (post) =>
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === "all" || post.category === categoryFilter)
    );
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* Introduction Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Restez Informé avec Biomedis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les dernières nouvelles, événements et réalisations de
            Biomedis. Nous partageons régulièrement des informations sur
            l&apos;industrie médicale et de laboratoire pour vous tenir au
            courant des avancées dans notre domaine.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-2/3"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="md:w-1/3">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="Industry News">
                  Actualités de l&apos;Industrie
                </SelectItem>
                <SelectItem value="Events & Achievements">
                  Événements & Réalisations
                </SelectItem>
                <SelectItem value="Company Announcements">
                  Annonces de l&apos;Entreprise
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Featured News Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">À la Une</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/3">
                <Image
                  src={newsData[0].image}
                  alt={newsData[0].title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">
                    {newsData[0].title}
                  </CardTitle>
                  <Badge variant="secondary">{newsData[0].category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {newsData[0].excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {newsData[0].date}
                  </span>
                  <Button asChild>
                    <Link href={`/news/${newsData[0].id}`}>Lire la suite</Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* News Grid Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Actualités Récentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.slice(1).map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <Badge variant="outline">{post.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {post.date}
                  </span>
                  <Button asChild variant="outline">
                    <Link href={`/news/${post.id}`}>Lire la suite</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Newsletter Signup Section */}
        <section className="bg-primary text-primary-foreground py-12 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
            <p className="text-xl mb-8">
              Abonnez-vous à notre newsletter pour recevoir les dernières
              actualités et mises à jour de Biomedis.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse e-mail"
                className="md:flex-grow bg-primary-foreground text-primary"
              />
              <Button type="submit" variant="secondary">
                S&apos;abonner
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
