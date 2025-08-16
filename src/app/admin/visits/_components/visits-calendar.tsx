
'use client';

import { useState, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { type Visit, getCaregiverById, getClientById } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Pencil } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { VisitForm } from './visit-form';
import { isSameDay } from 'date-fns';

const statusVariants = {
    'À venir': 'secondary',
    'Terminée': 'default',
    'En cours': 'outline',
    'Annulée': 'destructive',
} as const;

export function VisitsCalendar({ visits }: { visits: Visit[] }) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const eventDays = useMemo(() => {
        return visits.map(visit => visit.date);
    }, [visits]);

    const selectedDayVisits = useMemo(() => {
        if (!date) return [];
        return visits.filter(visit => isSameDay(visit.date, date));
    }, [visits, date]);

    const modifiers = {
        hasEvent: eventDays
    };
    
    const modifiersClassNames = {
        hasEvent: 'day-has-event'
    };
    
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                />
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Visites pour le {date ? date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
                </h3>
                {selectedDayVisits.length > 0 ? (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {selectedDayVisits.map(visit => {
                            const client = getClientById(visit.clientId);
                            const caregiver = getCaregiverById(visit.caregiverId);
                            return (
                                 <Card key={visit.id}>
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                         <Avatar>
                                            <AvatarImage src={client?.avatarUrl} alt={client?.name} data-ai-hint="person portrait" />
                                            <AvatarFallback>{client?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex-grow'>
                                            <CardTitle className="text-base">{client?.name}</CardTitle>
                                            <CardDescription>Soignant: {caregiver?.name}</CardDescription>
                                        </div>
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Ouvrir le menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <VisitForm 
                                                    visit={visit}
                                                    trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}><Pencil/> Modifier</DropdownMenuItem>}
                                                />
                                                <DropdownMenuItem>Replanifier</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Annuler</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center">
                                            <Badge variant={statusVariants[visit.status]}>{visit.status}</Badge>
                                            <span className="text-muted-foreground">{visit.time}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mt-2 mb-1">Tâches:</h4>
                                            <ul className="list-disc list-inside text-muted-foreground">
                                                {visit.tasks.map(t => <li key={t}>{t}</li>)}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                        <p className="text-muted-foreground">Aucune visite planifiée pour ce jour.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

