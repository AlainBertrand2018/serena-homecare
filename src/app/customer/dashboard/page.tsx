
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to your Portal</CardTitle>
              <CardDescription>
                This is your central hub for managing care.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>From here, you will be able to view upcoming visits, manage your profile, and communicate with your caregivers. This section is under construction.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
