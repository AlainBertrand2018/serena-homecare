
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogoWithName } from "@/components/logo";
import Link from "next/link";


export default function CustomerOnboardingPage() {
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 py-12">
        <Card className="w-full max-w-3xl">
            <CardHeader className="text-center">
                <div className="w-full flex justify-center mb-4">
                    <LogoWithName />
                </div>
                <CardTitle className="text-2xl">Welcome to SimpleShift</CardTitle>
                <CardDescription>
                    Please fill out your profile to help us provide the best care.
                </CardDescription>
            </CardHeader>
            <form>
                <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="123 Main St, Anytown, USA" />
                        </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mt-4 border-t pt-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="ec-name">Name</Label>
                            <Input id="ec-name" placeholder="Jane Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ec-relationship">Relationship</Label>
                            <Input id="ec-relationship" placeholder="Spouse" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ec-phone">Phone</Label>
                            <Input id="ec-phone" type="tel" placeholder="555-123-4567" />
                        </div>
                    </div>

                    <h3 className="font-semibold text-lg mt-4 border-t pt-4">Medical Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                            <Input id="allergies" placeholder="Peanuts, Shellfish" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="conditions">Medical Conditions (comma-separated)</Label>
                            <Input id="conditions" placeholder="Hypertension, Diabetes" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Current Medications</Label>
                        <Textarea placeholder="Please list medications, dosages, and frequency." />
                    </div>
                    
                    <h3 className="font-semibold text-lg mt-4 border-t pt-4">Care Plan</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="care-plan">Preferences & Needs</Label>
                        <Textarea id="care-plan" rows={4} placeholder="Tell us about daily routines, preferences, and any specific needs..." />
                    </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" asChild>
                        <Link href="/customer/dashboard">Save Profile</Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}
