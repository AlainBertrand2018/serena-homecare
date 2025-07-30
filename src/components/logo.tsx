import { cn } from '@/lib/utils';
import { Home, Plus } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-primary rounded-lg p-2 w-10 h-10", className)}>
      <Home className="text-primary-foreground w-6 h-6" />
    </div>
  );
}

export function LogoWithName({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <Logo />
            <h1 className="text-2xl font-bold text-foreground font-headline">JOVE HOME CARE</h1>
        </div>
    )
}
