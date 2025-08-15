
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Client } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { HeartPulse, Pill, ShieldAlert } from "lucide-react";

export function ClientDetails({ client, isOpen, onOpenChange }: { client: Client, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
           <Avatar className="h-16 w-16">
            <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="person portrait" />
            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <DialogTitle className="text-2xl">{client.name}</DialogTitle>
            <DialogDescription>{client.address}</DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><ShieldAlert className="text-primary"/> Contact d'Urgence</h3>
                <div className="text-sm text-muted-foreground">
                    <p><strong>Nom :</strong> {client.emergencyContact.name}</p>
                    <p><strong>Relation :</strong> {client.emergencyContact.relationship}</p>
                    <p><strong>Téléphone :</strong> {client.emergencyContact.phone}</p>
                </div>
                 <h3 className="font-semibold flex items-center gap-2 pt-4"><HeartPulse className="text-primary"/> Informations Médicales</h3>
                 <div className="space-y-2 text-sm">
                    <div>
                        <h4 className="font-medium text-foreground mb-1">Allergies</h4>
                        <div className="flex flex-wrap gap-1">
                           {client.medicalInfo.allergies.map(allergy => <Badge key={allergy} variant="destructive">{allergy}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-medium text-foreground mb-1">Conditions Actives</h4>
                        <div className="flex flex-wrap gap-1">
                           {client.medicalInfo.conditions.map(condition => <Badge key={condition} variant="secondary">{condition}</Badge>)}
                        </div>
                    </div>
                 </div>
            </div>
            <div className="space-y-4">
                 <h3 className="font-semibold">Plan de Soins</h3>
                 <p className="text-sm text-muted-foreground">{client.carePlan}</p>
                  <h3 className="font-semibold flex items-center gap-2 pt-4"><Pill className="text-primary"/> Médicaments</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {client.medicalInfo.medications.map(med => (
                            <li key={med.name}>{med.name} ({med.dosage}) - {med.frequency}</li>
                        ))}
                    </ul>
            </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
