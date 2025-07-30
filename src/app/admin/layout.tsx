
import type { ReactNode } from "react";
import { AdminNav } from "./_components/admin-nav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminNav />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
        </main>
    </div>
  );
}
