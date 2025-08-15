
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { WelcomePopup } from "@/components/welcome-popup";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: "SERENA",
  description: "Service de Soins à Domicile",
  icons: {
    icon: "/images/siteIcon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
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
