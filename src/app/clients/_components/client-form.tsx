
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
import type { Client } from "@/lib/data";

interface ClientFormProps {
    client?: Client;
    trigger: React.ReactNode;
    onAddClient?: (client: Omit<Client, 'id'>) => void;
}

export function ClientForm({ client, trigger, onAddClient }: ClientFormProps) {
    const [open, setOpen] = useState(false);
    const isEditing = !!client;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newClientData = {
            name: formData.get('name') as string,
            address: formData.get('address') as string,
            avatarUrl: formData.get('avatarUrl') as string,
            emergencyContact: {
                name: formData.get('ec-name') as string,
                relationship: formData.get('ec-relationship') as string,
                phone: formData.get('ec-phone') as string,
            },
            medicalInfo: {
                allergies: (formData.get('allergies') as string).split(',').map(s => s.trim()).filter(Boolean),
                conditions: (formData.get('conditions') as string).split(',').map(s => s.trim()).filter(Boolean),
                medications: client?.medicalInfo.medications || [], // Medication editing not implemented
            },
            carePlan: formData.get('care-plan') as string,
        };
        
        if (onAddClient && !isEditing) {
            onAddClient(newClientData);
        }
        
        // Here you would also handle the editing logic
        console.log("Formulaire client soumis", newClientData);
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier Client" : "Ajouter Nouveau Client"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Mettez à jour les informations du client ci-dessous." : "Remplissez le formulaire pour ajouter un nouveau client."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom Complet</Label>
                        <Input id="name" name="name" defaultValue={client?.name} placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" name="address" defaultValue={client?.address} placeholder="123 Rue Principale, Anytown, France" />
                    </div>
                </div>

                 <div className="grid gap-2">
                    <Label htmlFor="avatarUrl">URL de l'Avatar</Label>
                    <Input id="avatarUrl" name="avatarUrl" defaultValue={client?.avatarUrl} placeholder="https://placehold.co/100x100.png" />
                </div>
                
                <h3 className="font-semibold text-lg mt-4 border-t pt-4">Contact d'Urgence</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="ec-name">Nom</Label>
                        <Input id="ec-name" name="ec-name" defaultValue={client?.emergencyContact.name} placeholder="Jane Doe" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="ec-relationship">Relation</Label>
                        <Input id="ec-relationship" name="ec-relationship" defaultValue={client?.emergencyContact.relationship} placeholder="Conjoint(e)" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="ec-phone">Téléphone</Label>
                        <Input id="ec-phone" name="ec-phone" defaultValue={client?.emergencyContact.phone} placeholder="0612345678" />
                    </div>
                </div>

                <h3 className="font-semibold text-lg mt-4 border-t pt-4">Informations Médicales</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="allergies">Allergies (séparées par des virgules)</Label>
                        <Input id="allergies" name="allergies" defaultValue={client?.medicalInfo.allergies.join(', ')} placeholder="Arachides, Fruits de mer" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="conditions">Conditions (séparées par des virgules)</Label>
                        <Input id="conditions" name="conditions" defaultValue={client?.medicalInfo.conditions.join(', ')} placeholder="Hypertension, Diabète" />
                    </div>
                </div>
                
                <div className="grid gap-2">
                    <Label>Médicaments</Label>
                    {/* Une implémentation plus complexe permettrait d'ajouter/supprimer dynamiquement des médicaments */}
                    <div className="text-sm text-muted-foreground p-2 border rounded-md">
                       Pour ce prototype, la modification des médicaments n'est pas implémentée.
                    </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-4 border-t pt-4">Plan de Soins</h3>
                <div className="grid gap-2">
                    <Textarea id="care-plan" name="care-plan" defaultValue={client?.carePlan} rows={4} placeholder="Préférences du client, routines quotidiennes, etc."/>
                </div>

            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button type="submit">{isEditing ? "Sauvegarder" : "Créer Client"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
