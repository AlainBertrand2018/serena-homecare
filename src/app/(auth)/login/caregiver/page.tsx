
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
import { KeyRound, Mail, Stethoscope } from 'lucide-react';

export default function CaregiverLoginPage() {
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="space-y-4">
        <LogoWithName className="justify-center" />
        <div className="text-center">
           <div className="flex justify-center items-center gap-2">
            <Stethoscope className="h-6 w-6"/>
            <CardTitle className="text-2xl">Caregiver Login</CardTitle>
          </div>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" required className="pl-10" />
            </div>
          </div>
          <Button type="submit" className="w-full" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
         <div className="mt-4 text-center text-sm">
           <Link href="/login" className="underline">
            Back to role selection
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

