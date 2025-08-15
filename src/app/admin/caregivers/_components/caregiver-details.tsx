
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Caregiver } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Star, Briefcase, Mail, Phone, CalendarDays } from "lucide-react";

export function CaregiverDetails({ caregiver, isOpen, onOpenChange }: { caregiver: Caregiver, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
           <Avatar className="h-16 w-16">
            <AvatarImage src={caregiver.avatarUrl} alt={caregiver.name} data-ai-hint="person portrait" />
            <AvatarFallback>{caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <DialogTitle className="text-2xl">{caregiver.name}</DialogTitle>
            <div className="mt-1">
                <Badge variant={caregiver.status === 'Disponible' ? 'default' : caregiver.status === 'En mission' ? 'secondary' : 'destructive'}>{caregiver.status}</Badge>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Briefcase className="text-primary"/> Informations Professionnelles</h3>
                <div className="text-sm">
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/> caregiver@exemple.com</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground"/> 555-0105</p>
                    <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-muted-foreground"/> Rejoint le : 15 Jan, 2023</p>
                </div>
                 <h3 className="font-semibold flex items-center gap-2 pt-4"><Star className="text-primary"/> Compétences</h3>
                 <div className="flex flex-wrap gap-2">
                    {caregiver.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                 </div>
            </div>
            <div className="space-y-4">
                 <h3 className="font-semibold">Performance & Avis</h3>
                 <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Note Moyenne :</strong> 4.9/5 étoiles</p>
                    <p><strong>Visites Terminées :</strong> 78</p>
                    <p><strong>Avis Récent :</strong> "Samantha est merveilleuse avec ma mère. Toujours patiente et gentille."</p>
                 </div>

                  <h3 className="font-semibold pt-4">Clients Assignés</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Eleanor Vance (Actuel)</li>
                    <li>Arthur Pendelton (Passé)</li>
                  </ul>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
