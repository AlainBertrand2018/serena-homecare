
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Caregiver, CaregiverStatus } from "@/lib/data";

interface CaregiverFormProps {
    caregiver?: Caregiver;
    trigger: React.ReactNode;
    onAddCaregiver?: (caregiver: Omit<Caregiver, 'id'>) => void;
}

type EmploymentType = 'Salarié/e' | 'Temps Partiel' | 'Freelance';

const remunerationSuffixes: Record<EmploymentType, string> = {
    'Salarié/e': '/Mois',
    'Temps Partiel': '/heure',
    'Freelance': '/Prestation'
};

export function CaregiverForm({ caregiver, trigger, onAddCaregiver }: CaregiverFormProps) {
    const [open, setOpen] = useState(false);
    const [employmentType, setEmploymentType] = useState<EmploymentType>(caregiver?.employmentType || 'Salarié/e');
    const isEditing = !!caregiver;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const skillsValue = formData.get('skills') as string;
        
        // This is a simplified submission handler. 
        // You would expand this to handle the new fields.
        const newCaregiverData = {
            name: formData.get('name') as string,
            avatarUrl: formData.get('avatarUrl') as string,
            status: 'Disponible' as CaregiverStatus, // Defaulting status
            skills: skillsValue ? skillsValue.split(',').map(s => s.trim()) : [],
        };

        if (onAddCaregiver && !isEditing) {
            // @ts-ignore
            onAddCaregiver(newCaregiverData);
        }

        // Here you would also handle the editing logic
        console.log("Formulaire soignant soumis", newCaregiverData);
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier Soignant" : "Ajouter Nouveau Soignant"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Mettez à jour les informations du soignant." : "Remplissez le formulaire pour ajouter un nouveau soignant."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom Complet</Label>
                    <Input id="name" name="name" defaultValue={caregiver?.name} placeholder="Samantha Reed" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="avatarUrl">URL de l'Avatar</Label>
                    <Input id="avatarUrl" name="avatarUrl" defaultValue={caregiver?.avatarUrl} placeholder="https://placehold.co/100x100.png" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="employmentType">Type d'emploi</Label>
                    <Select 
                        name="employmentType" 
                        defaultValue={employmentType}
                        onValueChange={(value) => setEmploymentType(value as EmploymentType)}
                    >
                        <SelectTrigger id="employmentType">
                            <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Salarié/e">Salarié/e</SelectItem>
                            <SelectItem value="Temps Partiel">Temps Partiel</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="remuneration">Rémunération</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">MUR</span>
                        <Input id="remuneration" name="remuneration" type="number" placeholder="500" className="flex-grow" />
                        <span className="text-muted-foreground whitespace-nowrap">{remunerationSuffixes[employmentType]}</span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="skills">Compétences (séparées par des virgules)</Label>
                    <Input id="skills" name="skills" defaultValue={caregiver?.skills.join(', ')} placeholder="Soins personnels, Soins pour la démence" />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button type="submit">{isEditing ? "Sauvegarder" : "Créer Soignant"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
