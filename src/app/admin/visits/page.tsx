
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
import { PlusCircle } from "lucide-react";
import { VisitForm } from "./_components/visit-form";
import { VisitsCalendar } from "./_components/visits-calendar";

export default function AdminVisitsPage() {
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
        <VisitsCalendar visits={visits} />
      </CardContent>
    </Card>
  );
}
