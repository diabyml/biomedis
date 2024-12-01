import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import StyledComponentsRegistry from "@/lib/registry";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Biomedis - Solutions de Laboratoire Innovantes",
  description:
    "Biomedis fournit des réactifs de laboratoire de pointe, des services de distribution d'équipements et de tourisme médical au Mali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ScrollToTop />
          <Navigation />
          {children}
          <Toaster richColors position="top-center" />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
