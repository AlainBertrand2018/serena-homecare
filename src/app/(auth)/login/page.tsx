
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogoWithName } from '@/components/logo';
import { Users, Stethoscope, Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <Card className="mx-auto max-w-sm w-full bg-card/60 backdrop-blur-lg text-card-foreground border-border/20">
      <CardHeader className="space-y-4">
        <LogoWithName className="justify-center" />
        <div className="text-center">
          <CardTitle className="text-2xl">Enter as:</CardTitle>
          <CardDescription>
            Please choose your portal to login.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button size="lg" className="w-full justify-start" asChild>
          <Link href="/login/customer">
            <Users />
            Customer & Custodian
          </Link>
        </Button>
        <Button size="lg" className="w-full justify-start" asChild>
          <Link href="/login/caregiver">
            <Stethoscope />
            Caregiver
          </Link>
        </Button>
        <Button size="lg" className="w-full justify-start" asChild>
          <Link href="/login/admin">
            <Shield />
            Administrator
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
