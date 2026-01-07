
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { WelcomePopup } from "@/components/welcome-popup";
import { Analytics } from "@vercel/analytics/next"

const title = "SERENA | L'IA au Service des Soins à Domicile à l'Île Maurice";
const description = "SERENA, logiciel IA 100% mauricien pour la gestion des soins à domicile, RH, des plans de soins infirmiers personnalisés et aide-soignants professionnels. Santé, dignité et technologie.";
const keywords = ["soins à domicile", "aide-soignant", "aide à la personne", "soins pour personnes âgées", "accompagnement", "soins infirmiers", "service à la personne", "Île Maurice", "IA", "Intelligence Artificelle"];
const url = "https://serena.business-studio-ai.online";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | SERENA`,
  },
  description: description,
  keywords: keywords,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: 'SERENA',
    images: [
      {
        url: '/images/CareGiver.webp',
        width: 1200,
        height: 630,
        alt: "Soignant SERENA avec un patient âgé.",
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ['/images/CareGiver.webp'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SERENA',
  description: description,
  url: url,
  logo: `${url}/images/weblogo.webp`,
  image: `${url}/images/CareGiver.webp`,
  telephone: '+23058495050',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MU',
    addressLocality: 'Mauritius'
  },
   areaServed: {
    '@type': 'Country',
    name: 'Mauritius'
  },
   aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '3'
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Marguerite T.' },
      reviewBody: 'Le soignant de SERENA a été une véritable bénédiction pour notre famille. Si compatissant et fiable.',
      reviewRating: { '@type': 'Rating', ratingValue: '5' }
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Jean & Suzanne P.' },
      reviewBody: 'Nous étions si inquiets de trouver de bons soins pour mon père. SERENA a rendu le processus simple et sans stress.',
      reviewRating: { '@type': 'Rating', ratingValue: '5' }
    },
     {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'David L.' },
      reviewBody: 'Excellent service. Les soignants sont professionnels et l\'administration est toujours serviable et réactive.',
      reviewRating: { '@type': 'Rating', ratingValue: '4.8' }
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de soins à domicile',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Accompagnement',
          description: 'Idéal pour les clients ayant besoin d\'interaction sociale et d\'une aide légère.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Soins Personnels',
          description: 'Assistance complète pour les activités quotidiennes.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Soins Infirmiers Qualifiés',
          description: 'Pour les clients ayant des besoins médicaux nécessitant un professionnel agréé.'
        }
      }
    ]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer />
        <ChatbotWidget />
        <WelcomePopup />
        <Analytics />
      </body>
    </html>
  );
}
