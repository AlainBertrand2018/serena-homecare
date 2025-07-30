import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import { LogoWithName } from "@/components/logo";
import { Upload } from "lucide-react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function OnboardingPage() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="w-full flex justify-center">
          <LogoWithName />
        </div>
        <CardTitle className="text-2xl">Caregiver Onboarding</CardTitle>
        <CardDescription>
          Complete your profile to start accepting visits.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Document Uploads</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="id-document">ID Document (Passport, Driver's License)</Label>
              <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>
                <Input id="id-document" type="file" className="sr-only" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="caregiver-cert">Caregiver Certificate (Optional)</Label>
               <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>
                <Input id="caregiver-cert" type="file" className="sr-only" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Availability</h3>
          <p className="text-sm text-muted-foreground">
            Select the days you are available to work.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox id={day.toLowerCase()} />
                <Label htmlFor={day.toLowerCase()}>{day}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" asChild>
          <Link href="/dashboard">Complete Onboarding</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
