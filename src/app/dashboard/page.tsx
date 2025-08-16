
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { visits, VisitStatus } from "@/lib/data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const statusVariants: Record<VisitStatus, string> = {
    'À venir': 'bg-gray-500',
    'Terminée': 'bg-green-600',
    'En cours': 'bg-orange-500',
    'Annulée': 'bg-red-600',
} as const;


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl md:text-3xl">Visites à Venir</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visits.map((visit) => (
            <Card key={visit.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={visit.clientAvatarUrl} alt={visit.clientName} data-ai-hint="person elderly" />
                    <AvatarFallback>{visit.clientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{visit.clientName}</CardTitle>
                    <div className="mt-1">
                        <Badge className={cn("text-white", statusVariants[visit.status])}>{visit.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(visit.date, "PPP")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{visit.time}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>{visit.clientAddress}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/visits/${visit.id}`}>
                    Voir les Détails <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
