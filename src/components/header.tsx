
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LogoWithName } from "./logo";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/careers", label: "Careers" },
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
        <Link href="/">
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
            <Link href="/login">Login</Link>
         </Button>
      </nav>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
             <Link href="/" onClick={() => setSheetOpen(false)}>
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
                <Link href="/login" onClick={() => setSheetOpen(false)}>Login</Link>
             </Button>
          </nav>
        </SheetContent>
      </Sheet>
       <div className="flex-grow md:hidden text-center">
            <Link href="/">
                <LogoWithName className="justify-center"/>
            </Link>
       </div>
       <div className="md:hidden">
            <Button asChild size="sm">
                <Link href="/login">Login</Link>
            </Button>
       </div>
    </header>
  );
}
