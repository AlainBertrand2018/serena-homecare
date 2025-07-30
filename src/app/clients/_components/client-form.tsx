
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
        console.log("Client form submitted", newClientData);
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Client" : "Add New Client"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the client's information below." : "Fill out the form to add a new client."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" defaultValue={client?.name} placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" defaultValue={client?.address} placeholder="123 Main St, Anytown, USA" />
                    </div>
                </div>

                 <div className="grid gap-2">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input id="avatarUrl" name="avatarUrl" defaultValue={client?.avatarUrl} placeholder="https://placehold.co/100x100.png" />
                </div>
                
                <h3 className="font-semibold text-lg mt-4 border-t pt-4">Emergency Contact</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="ec-name">Name</Label>
                        <Input id="ec-name" name="ec-name" defaultValue={client?.emergencyContact.name} placeholder="Jane Doe" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="ec-relationship">Relationship</Label>
                        <Input id="ec-relationship" name="ec-relationship" defaultValue={client?.emergencyContact.relationship} placeholder="Spouse" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="ec-phone">Phone</Label>
                        <Input id="ec-phone" name="ec-phone" defaultValue={client?.emergencyContact.phone} placeholder="555-123-4567" />
                    </div>
                </div>

                <h3 className="font-semibold text-lg mt-4 border-t pt-4">Medical Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                        <Input id="allergies" name="allergies" defaultValue={client?.medicalInfo.allergies.join(', ')} placeholder="Peanuts, Shellfish" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="conditions">Conditions (comma-separated)</Label>
                        <Input id="conditions" name="conditions" defaultValue={client?.medicalInfo.conditions.join(', ')} placeholder="Hypertension, Diabetes" />
                    </div>
                </div>
                
                <div className="grid gap-2">
                    <Label>Medications</Label>
                    {/* A more complex implementation would allow adding/removing medications dynamically */}
                    <div className="text-sm text-muted-foreground p-2 border rounded-md">
                       For this prototype, medication editing is not implemented.
                    </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-4 border-t pt-4">Care Plan</h3>
                <div className="grid gap-2">
                    <Textarea id="care-plan" name="care-plan" defaultValue={client?.carePlan} rows={4} placeholder="Client preferences, daily routines, etc."/>
                </div>

            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{isEditing ? "Save Changes" : "Create Client"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
