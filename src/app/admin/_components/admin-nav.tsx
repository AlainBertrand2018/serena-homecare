
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/caregivers", label: "Caregivers", icon: Briefcase },
    { href: "/admin/visits", label: "Visits", icon: Calendar },
    { href: "/admin/financials", label: "Financials", icon: DollarSign },
];

export function AdminNav() {
    const pathname = usePathname();
    return (
        <aside className="border-b">
          <div className="px-4 py-2">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:gap-x-4">
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary bg-muted" : "text-muted-foreground"
                        )}
                        >
                        <link.icon className="h-4 w-4" />
                        <span className="hidden sm:inline-block">{link.label}</span>
                    </Link>
                ))}
            </nav>
          </div>
        </aside>
    );
}
