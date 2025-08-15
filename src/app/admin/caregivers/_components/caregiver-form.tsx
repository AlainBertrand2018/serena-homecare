
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

export function CaregiverForm({ caregiver, trigger, onAddCaregiver }: CaregiverFormProps) {
    const [open, setOpen] = useState(false);
    const isEditing = !!caregiver;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const skillsValue = formData.get('skills') as string;
        const newCaregiverData = {
            name: formData.get('name') as string,
            avatarUrl: formData.get('avatarUrl') as string,
            status: formData.get('status') as CaregiverStatus,
            skills: skillsValue ? skillsValue.split(',').map(s => s.trim()) : [],
        };

        if (onAddCaregiver && !isEditing) {
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
                    <Label htmlFor="status">Statut</Label>
                    <Select name="status" defaultValue={caregiver?.status}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Disponible">Disponible</SelectItem>
                            <SelectItem value="En mission">En mission</SelectItem>
                            <SelectItem value="Indisponible">Indisponible</SelectItem>
                        </SelectContent>
                    </Select>
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
