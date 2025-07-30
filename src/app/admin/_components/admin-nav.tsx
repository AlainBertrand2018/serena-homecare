
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/caregivers", label: "Caregivers", icon: Briefcase },
    { href: "/admin/visits", label: "Visits", icon: Calendar },
];

export function AdminNav() {
    const pathname = usePathname();
    return (
        <aside className="border-b">
          <div className="px-4 py-2">
            <nav className="flex items-center space-x-2 lg:space-x-4">
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
                        {link.label}
                    </Link>
                ))}
            </nav>
          </div>
        </aside>
    );
}
