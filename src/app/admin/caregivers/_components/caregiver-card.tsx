
'use client';

import { useState } from 'react';
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
import { Edit, Star } from "lucide-react";
import { CaregiverForm } from "./caregiver-form";
import type { Caregiver, CaregiverStatus } from "@/lib/data";
import { CaregiverDetails } from './caregiver-details';

const statusColors: Record<CaregiverStatus, string> = {
    'Disponible': 'bg-green-500',
    'En mission': 'bg-yellow-500',
    'Indisponible': 'bg-red-500',
}

export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
    const [detailsOpen, setDetailsOpen] = useState(false);

    return (
        <>
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
                        <h4 className="font-semibold text-sm mb-2">Compétences</h4>
                        <div className="flex flex-wrap gap-1">
                            {caregiver.skills.map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full" onClick={() => setDetailsOpen(true)}>
                        <Star/> Voir Profil
                    </Button>
                    <CaregiverForm 
                        caregiver={caregiver}
                        trigger={<Button className="w-full"><Edit/> Modifier</Button>}
                    />
                </CardFooter>
            </Card>
            <CaregiverDetails caregiver={caregiver} isOpen={detailsOpen} onOpenChange={setDetailsOpen} />
        </>
    )
}
