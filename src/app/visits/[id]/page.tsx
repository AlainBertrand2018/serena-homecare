import { getClientById, getVisitById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, ShieldAlert, HeartPulse, Pill, FileText, ListChecks } from "lucide-react";
import { CareLogSection } from "./_components/care-log-section";
import { Badge } from "@/components/ui/badge";

export default function VisitDetailsPage({ params }: { params: { id: string } }) {
  const visit = getVisitById(params.id);
  
  if (!visit) {
    notFound();
  }

  const client = getClientById(visit.clientId);
  
  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="person elderly portrait" />
                <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <CardTitle className="text-2xl">{client.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{client.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" />
                        <span>{client.emergencyContact.name} ({client.emergencyContact.relationship}) - {client.emergencyContact.phone}</span>
                    </div>
                </div>
              </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HeartPulse/> Informations Médicales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm mb-1">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                           {client.medicalInfo.allergies.map(allergy => <Badge key={allergy} variant="destructive">{allergy}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-sm mb-1">Conditions Actives</h4>
                        <div className="flex flex-wrap gap-2">
                           {client.medicalInfo.conditions.map(condition => <Badge key={condition} variant="secondary">{condition}</Badge>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Médicaments</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {client.medicalInfo.medications.map(med => (
                                <li key={med.name} className="flex items-center gap-2"><Pill className="h-4 w-4 text-primary"/>{med.name} ({med.dosage}) - {med.frequency}</li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText/> Plan de Soins</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{client.carePlan}</p>
                </CardContent>
            </Card>
        </div>

         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListChecks/> Tâches de la Visite</CardTitle>
                <CardDescription>Tâches spécifiques à accomplir lors de cette visite.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {visit.tasks.map(task => <li key={task}>{task}</li>)}
                </ul>
            </CardContent>
        </Card>
        
        <CareLogSection />

      </main>
    </div>
  );
}
