
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-full flex-col bg-muted/40 items-center justify-center">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Caregiver Application</CardTitle>
            <CardDescription>
              This is where the caregiver application form will be. It is currently under construction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check back later to apply.</p>
             <Button className="mt-4">Start Application</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
