
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LogoWithName } from "./logo";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#services", label: "Services" },
    { href: "/#pricing", label: "Tarifs" },
    { href: "/#testimonials", label: "Témoignages" },
    { href: "/careers", label: "Postuler" },
    { href: "/#booking", label: "Contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scroll for hash links on the homepage
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Close sheet on mobile after clicking
        setSheetOpen(false);
      }
    } else {
        // For other links, just close the sheet
        setSheetOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <nav className="hidden w-full flex-row items-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="mr-6">
          <LogoWithName />
        </Link>
        <div className="flex-grow"></div>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={(e) => handleLinkClick(e, href)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
         <Button asChild>
            <Link href="/login">Connexion</Link>
         </Button>
      </nav>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Ouvrir le menu de navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
           <SheetHeader>
            <SheetTitle className="sr-only">Menu de Navigation</SheetTitle>
          </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium">
             <Link href="/" onClick={() => setSheetOpen(false)} className="flex items-center gap-2 text-lg font-semibold">
                <LogoWithName />
            </Link>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {label}
              </Link>
            ))}
             <Button asChild>
                <Link href="/login" onClick={() => setSheetOpen(false)}>Connexion</Link>
             </Button>
          </nav>
        </SheetContent>
      </Sheet>
       <div className="flex w-full items-center justify-center md:hidden">
            <Link href="/">
                <LogoWithName />
            </Link>
       </div>
       <div className="md:hidden">
            <Button asChild size="sm">
                <Link href="/login">Connexion</Link>
            </Button>
       </div>
    </header>
  );
}
