"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetOverlay,
} from "@/components/ui/sheet";

const menuItems = [
  { title: "Accueil", href: "/" },
  { title: "À Propos", href: "/about" },
  { title: "Produits & Services", href: "/products-services" },
  // { title: "Actualités", href: "/news-updates" },
  { title: "Partenaires", href: "/partners" },
  { title: "Tourisme Médical", href: "/medical-tourism" },
  { title: "Contact", href: "/contact" },
];

export function Navigation() {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e.currentTarget.href.includes("#")) {
      e.preventDefault();
      const targetId = e.currentTarget.href.replace(/.*\#/, "");
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2" scroll={false}>
            <span className="text-2xl font-bold text-blue-600">
              Bio<span className="text-red-500">medis</span>
            </span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              onClick={handleClick}
              scroll={false}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetPortal>
            <SheetOverlay className="fixed inset-0 z-50 " />
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col h-full">
                <SheetHeader>
                  <SheetTitle className="hidden">Menu de Navigation</SheetTitle>
                  <SheetDescription className="hidden">
                    Accédez à toutes les sections de notre site
                  </SheetDescription>
                </SheetHeader>
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={handleClick}
                  scroll={false}
                >
                  <span className="text-2xl font-bold text-blue-600">
                    Bio<span className="text-red-500">medis</span>
                  </span>
                </Link>
                <nav className="mt-6 flex flex-col space-y-3">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      onClick={handleClick}
                      scroll={false}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </SheetPortal>
        </Sheet>
        <div className="hidden lg:block">
          <Button asChild>
            <Link href="/contact" scroll={false}>
              Contactez-nous
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
