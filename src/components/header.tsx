
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle } from "lucide-react";
import { LogoWithName } from "./logo";

export function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/careers", label: "Careers" },
    { href: "/#booking", label: "Contact" },
    { href: "/chatbot", label: "Chat" },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <nav className="hidden w-full flex-row items-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <LogoWithName />
        <div className="flex-grow"></div>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
         <Button asChild>
            <Link href="/login">Login</Link>
         </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <LogoWithName />
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {label}
              </Link>
            ))}
             <Button asChild>
                <Link href="/login">Login</Link>
             </Button>
          </nav>
        </SheetContent>
      </Sheet>
       <div className="flex-grow md:hidden text-center">
            <LogoWithName className="justify-center"/>
       </div>
       <div className="md:hidden">
            <Button asChild size="sm">
                <Link href="/login">Login</Link>
            </Button>
       </div>
    </header>
  );
}
