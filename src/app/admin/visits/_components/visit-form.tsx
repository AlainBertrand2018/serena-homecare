
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { clients, caregivers, type Visit, type Caregiver } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function AssignCaregiverDialog({ onSelectCaregiver }: { onSelectCaregiver: (caregiver: Caregiver) => void }) {
    const [open, setOpen] = useState(false);

    const handleSelect = (caregiver: Caregiver) => {
        onSelectCaregiver(caregiver);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Assigner Soignant...
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Assigner Soignant</DialogTitle>
                    <DialogDescription>Sélectionnez un soignant disponible pour cette visite.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    {caregivers.map(caregiver => (
                        <div key={caregiver.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                            <Avatar>
                                <AvatarImage src={caregiver.avatarUrl} alt={caregiver.name} data-ai-hint="person portrait" />
                                <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{caregiver.name}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {caregiver.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <Badge variant={caregiver.status === 'Disponible' ? 'default' : 'destructive'}>{caregiver.status}</Badge>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => handleSelect(caregiver)}
                                disabled={caregiver.status !== 'Disponible'}
                            >
                                Assigner
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface VisitFormProps {
    visit?: Visit;
    trigger: React.ReactNode;
}

export function VisitForm({ visit, trigger }: VisitFormProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(visit ? new Date(visit.date) : new Date());
    const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(
        visit ? caregivers.find(c => c.id === visit.caregiverId) || null : null
    );
    const isEditing = !!visit;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulaire de visite soumis");
        setOpen(false);
    }

    const handleCaregiverSelect = (caregiver: Caregiver) => {
        setSelectedCaregiver(caregiver);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier Visite" : "Planifier Nouvelle Visite"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Mettez à jour les détails de la visite ci-dessous." : "Assignez un client à un soignant pour une date et une heure spécifiques."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="client">Client</Label>
                        <Select defaultValue={visit?.clientId}>
                            <SelectTrigger id="client">
                                <SelectValue placeholder="Sélectionnez un client" />
                            </SelectTrigger>
                            <SelectContent>
                                {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="caregiver">Soignant</Label>
                        {selectedCaregiver ? (
                             <div className="flex items-center gap-2 p-2 border rounded-md">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedCaregiver.avatarUrl} alt={selectedCaregiver.name} />
                                    <AvatarFallback>{selectedCaregiver.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium flex-grow">{selectedCaregiver.name}</span>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedCaregiver(null)}>Changer</Button>
                            </div>
                        ) : (
                           <AssignCaregiverDialog onSelectCaregiver={handleCaregiverSelect} />
                        )}
                        <Input type="hidden" name="caregiverId" value={selectedCaregiver?.id || ''} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Choisissez une date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="time">Heure</Label>
                        <Input id="time" defaultValue={visit?.time} placeholder="ex: 09:00 - 11:00" />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select defaultValue={visit?.status || 'À venir'}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="À venir">À venir</SelectItem>
                             <SelectItem value="En cours">En cours</SelectItem>
                             <SelectItem value="Terminée">Terminée</SelectItem>
                             <SelectItem value="Annulée">Annulée</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="tasks">Tâches (séparées par des virgules)</Label>
                    <Textarea id="tasks" defaultValue={visit?.tasks.join(', ')} placeholder="Préparer le petit déjeuner, administrer les médicaments..." />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button type="submit">{isEditing ? "Sauvegarder" : "Planifier Visite"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
