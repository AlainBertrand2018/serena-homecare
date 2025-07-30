
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
                <Badge variant={caregiver.status === 'Available' ? 'default' : caregiver.status === 'On Assignment' ? 'secondary' : 'destructive'}>{caregiver.status}</Badge>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Briefcase className="text-primary"/> Professional Information</h3>
                <div className="text-sm">
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/> caregiver@example.com</p>
                    <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground"/> 555-0105</p>
                    <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-muted-foreground"/> Joined: Jan 15, 2023</p>
                </div>
                 <h3 className="font-semibold flex items-center gap-2 pt-4"><Star className="text-primary"/> Skills</h3>
                 <div className="flex flex-wrap gap-2">
                    {caregiver.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                 </div>
            </div>
            <div className="space-y-4">
                 <h3 className="font-semibold">Performance & Reviews</h3>
                 <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Avg. Rating:</strong> 4.9/5 stars</p>
                    <p><strong>Completed Visits:</strong> 78</p>
                    <p><strong>Recent Feedback:</strong> "Samantha is wonderful with my mother. Always patient and kind."</p>
                 </div>

                  <h3 className="font-semibold pt-4">Assigned Clients</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Eleanor Vance (Current)</li>
                    <li>Arthur Pendelton (Past)</li>
                  </ul>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
