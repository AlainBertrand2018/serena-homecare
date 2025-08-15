import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoWithName } from "@/components/logo";
import { KeyRound, Mail, User } from 'lucide-react';


export default function SignupPage() {
  return (
    <Card className="mx-auto max-w-sm w-full bg-card/60 backdrop-blur-lg text-card-foreground border-border/20">
      <CardHeader className="space-y-4">
        <LogoWithName className="justify-center" />
        <div className="text-center">
          <CardTitle className="text-2xl">Créer un Compte</CardTitle>
          <CardDescription>
            Entrez vos informations pour créer un compte
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="full-name" placeholder="John Doe" required className="pl-10 bg-background/70"/>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="m@exemple.com"
                required
                className="pl-10 bg-background/70"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
             <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" required className="pl-10 bg-background/70"/>
            </div>
          </div>
          <Button type="submit" className="w-full" asChild>
            <Link href="/verify-otp">Créer un compte</Link>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="underline">
            Connexion
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
