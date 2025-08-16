
'use client';

import { visits as initialVisits, type Visit, type VisitStatus } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { VisitForm } from "./_components/visit-form";
import { MonthlyPlanner } from "./_components/monthly-planner";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const statusVariants: Record<VisitStatus, "default" | "secondary" | "destructive" | "outline"> = {
    'À venir': 'secondary',
    'Terminée': 'default',
    'En cours': 'outline',
    'Annulée': 'destructive',
} as const;

export default function AdminVisitsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visits, setVisits] = useState<Visit[]>(initialVisits);

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleAddVisit = (newVisit: Visit) => {
    setVisits(prev => [...prev, newVisit]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <CardTitle>Visites Planifiées</CardTitle>
                <CardDescription>
                Gérez et planifiez toutes les visites des clients.
                </CardDescription>
            </div>
            <VisitForm 
                onAddVisit={handleAddVisit}
                trigger={
                    <Button>
                        <PlusCircle />
                        Planifier Nouvelle Visite
                    </Button>
                } 
            />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-muted-foreground mt-4 border-t pt-4">
            <span className="font-medium">Légende:</span>
            {Object.entries(statusVariants).map(([status, variant]) => (
                 <div key={status} className="flex items-center gap-2">
                    <Badge variant={variant} className="w-20 justify-center">{status}</Badge>
                </div>
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold capitalize">
                {format(currentDate, "MMMM yyyy", { locale: fr })}
            </h2>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <MonthlyPlanner visits={visits} currentDate={currentDate} />
      </CardContent>
    </Card>
  );
}
