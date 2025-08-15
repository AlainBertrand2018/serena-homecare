import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center p-4">
       <Image
        src="/images/CareGiver.webp"
        alt="Arrière-plan"
        fill
        className="absolute inset-0 z-0 brightness-50 object-cover"
        data-ai-hint="background caregiver"
      />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </main>
  );
}
