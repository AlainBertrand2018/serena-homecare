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
import { LogoWithName } from "@/components/logo";

export default function VerifyOtpPage() {
  return (
    <Card className="mx-auto max-w-sm w-full bg-card/60 backdrop-blur-lg text-card-foreground border-border/20">
      <CardHeader className="space-y-4">
        <LogoWithName className="justify-center" />
        <div className="text-center">
          <CardTitle className="text-2xl">Verify Your Account</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email address.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-6 gap-2">
            <Input id="otp-1" maxLength={1} className="text-center text-lg bg-background/70" />
            <Input id="otp-2" maxLength={1} className="text-center text-lg bg-background/70" />
            <Input id="otp-3" maxLength={1} className="text-center text-lg bg-background/70" />
            <Input id="otp-4" maxLength={1} className="text-center text-lg bg-background/70" />
            <Input id="otp-5" maxLength={1} className="text-center text-lg bg-background/70" />
            <Input id="otp-6" maxLength={1} className="text-center text-lg bg-background/70" />
          </div>
          <Button type="submit" className="w-full" asChild>
             <Link href="/dashboard">Verify Code</Link>
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Didn't receive a code?{" "}
          <button className="underline">Resend</button>
        </div>
      </CardContent>
    </Card>
  );
}
