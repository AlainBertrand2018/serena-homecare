
'use client';

import { visits } from "@/lib/data";
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

export default function AdminVisitsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Visites Planifiées</CardTitle>
            <CardDescription>
            Gérez et planifiez toutes les visites des clients.
            </CardDescription>
        </div>
        <VisitForm trigger={
            <Button>
                <PlusCircle />
                Planifier Nouvelle Visite
            </Button>
        } />
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
