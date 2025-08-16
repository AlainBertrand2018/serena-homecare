
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Visit, getClientById, getCaregiverById } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { User, Briefcase, Calendar, Clock, ListChecks } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const statusVariants = {
    'À venir': 'bg-gray-500 hover:bg-gray-600',
    'Terminée': 'bg-green-600 hover:bg-green-700',
    'En cours': 'bg-orange-500 hover:bg-orange-600',
    'Annulée': 'bg-red-600 hover:bg-red-700',
} as const;


export function VisitDetails({ visit, isOpen, onOpenChange }: { visit: Visit, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  const client = getClientById(visit.clientId);
  const caregiver = getCaregiverById(visit.caregiverId);

  if (!client || !caregiver) {
    return null; // Or show an error state
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Détails de la Visite</DialogTitle>
          <DialogDescription>
             {format(visit.date, "EEEE d MMMM yyyy", { locale: fr })} à {visit.time}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><User className="text-primary"/> Client</h3>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.address}</p>
                    </div>
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Briefcase className="text-primary"/> Soignant</h3>
                 <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={caregiver.avatarUrl} alt={caregiver.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{caregiver.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {caregiver.id}</p>
                    </div>
                </div>
            </div>
        </div>
         <Separator />
         <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2"><Calendar className="text-primary"/> Horaire</h3>
                <Badge className={cn("text-white", statusVariants[visit.status])}>{visit.status}</Badge>
              </div>
               <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{visit.time}</span>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-2"><ListChecks className="text-primary"/> Tâches</h3>
                 <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {visit.tasks.map(task => <li key={task}>{task}</li>)}
                </ul>
              </div>
         </div>
      </DialogContent>
    </Dialog>
  )
}
