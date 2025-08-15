
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
              <CardTitle>Bienvenue sur votre Portail</CardTitle>
              <CardDescription>
                Ceci est votre hub central pour la gestion des soins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>D'ici, vous pourrez voir les visites à venir, gérer votre profil et communiquer avec vos soignants. Cette section est en construction.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
