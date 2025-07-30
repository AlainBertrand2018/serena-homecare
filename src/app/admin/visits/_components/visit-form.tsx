
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
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { clients, caregivers, type Visit } from "@/lib/data";

interface VisitFormProps {
    visit?: Visit;
    trigger: React.ReactNode;
}

export function VisitForm({ visit, trigger }: VisitFormProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(visit ? new Date(visit.date) : undefined);
    const isEditing = !!visit;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Visit form submitted");
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Visit" : "Schedule New Visit"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the visit details below." : "Assign a client to a caregiver for a specific date and time."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="client">Client</Label>
                    <Select defaultValue={visit?.clientId}>
                        <SelectTrigger id="client">
                            <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="caregiver">Caregiver</Label>
                    <Select defaultValue={visit?.caregiverId}>
                        <SelectTrigger id="caregiver">
                            <SelectValue placeholder="Select a caregiver" />
                        </SelectTrigger>
                        <SelectContent>
                            {caregivers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
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
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" defaultValue={visit?.time} placeholder="e.g., 9:00 AM - 11:00 AM" />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={visit?.status}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="Upcoming">Upcoming</SelectItem>
                             <SelectItem value="In Progress">In Progress</SelectItem>
                             <SelectItem value="Completed">Completed</SelectItem>
                             <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="tasks">Tasks (comma-separated)</Label>
                    <Textarea id="tasks" defaultValue={visit?.tasks.join(', ')} placeholder="Prepare breakfast, Administer medication..." />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">{isEditing ? "Save Changes" : "Schedule Visit"}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
