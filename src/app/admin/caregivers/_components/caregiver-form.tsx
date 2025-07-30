
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
import type { Caregiver } from "@/lib/data";

interface CaregiverFormProps {
    caregiver?: Caregiver;
    trigger: React.ReactNode;
    onAddCaregiver?: (caregiver: Omit<Caregiver, 'id' | 'status'> & { status: string }) => void;
}

export function CaregiverForm({ caregiver, trigger, onAddCaregiver }: CaregiverFormProps) {
    const [open, setOpen] = useState(false);
    const isEditing = !!caregiver;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newCaregiverData = {
            name: formData.get('name') as string,
            avatarUrl: formData.get('avatarUrl') as string,
            status: formData.get('status') as string,
            skills: (formData.get('skills') as string).split(',').map(s => s.trim()),
        };

        if (onAddCaregiver && !isEditing) {
            onAddCaregiver(newCaregiverData as any);
        }

        // Here you would also handle the editing logic
        console.log("Caregiver form submitted", newCaregiverData);
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Caregiver" : "Add New Caregiver"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the caregiver's information." : "Fill out the form to add a new caregiver."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" defaultValue={caregiver?.name} placeholder="Samantha Reed" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input id="avatarUrl" name="avatarUrl" defaultValue={caregiver?.avatarUrl} placeholder="https://placehold.co/100x100.png" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={caregiver?.status}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Available">Available</SelectItem>
                            <SelectItem value="On Assignment">On Assignment</SelectItem>
                            <SelectItem value="Unavailable">Unavailable</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input id="skills" name="skills" defaultValue={caregiver?.skills.join(', ')} placeholder="Personal Care, Dementia Care" />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{isEditing ? "Save Changes" : "Create Caregiver"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
