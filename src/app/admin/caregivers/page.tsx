
'use client';

import { caregivers } from "@/lib/data";
import type { Caregiver } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Star } from "lucide-react";

const statusColors = {
    'Available': 'bg-green-500',
    'On Assignment': 'bg-yellow-500',
    'Unavailable': 'bg-red-500',
}

function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={caregiver.avatarUrl} alt={caregiver.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{caregiver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span 
                            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background ${statusColors[caregiver.status]}`}
                            title={caregiver.status}
                        />
                    </div>
                    <div>
                        <CardTitle>{caregiver.name}</CardTitle>
                        <CardDescription>{caregiver.status}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <div>
                    <h4 className="font-semibold text-sm mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                        {caregiver.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button variant="outline" className="w-full">
                    <Star/> View Profile
                </Button>
                <Button className="w-full"><Edit/> Edit</Button>
            </CardFooter>
        </Card>
    )
}


export default function AdminCaregiversPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl md:text-3xl">Caregivers</h1>
        <Button><PlusCircle /> Add New Caregiver</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {caregivers.map((caregiver) => (
          <CaregiverCard key={caregiver.id} caregiver={caregiver} />
        ))}
      </div>
    </>
  );
}
