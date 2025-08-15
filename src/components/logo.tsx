import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-10 h-10", className)}>
      <Image 
        src="/images/weblogo.webp" 
        alt="SERENA Logo" 
        fill 
        className="object-contain"
      />
    </div>
  );
}

export function LogoWithName({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <Logo />
            <h1 className="text-2xl font-bold text-foreground font-headline">SERENA</h1>
        </div>
    )
}
