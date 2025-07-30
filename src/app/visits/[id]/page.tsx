import { getClientById, getVisitById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Home, Mail, MapPin, Phone, User, ShieldAlert } from "lucide-react";
import { CareLogSection } from "./_components/care-log-section";

export default function VisitDetailsPage({ params }: { params: { id: string } }) {
  const visit = getVisitById(params.id);
  
  if (!visit) {
    notFound();
  }

  const client = getClientById(visit.clientId);
  
  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
             <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="person elderly portrait" />
                <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{client.name}</CardTitle>
                <CardDescription>Client Information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{client.address}</span>
            </div>
             <div className="flex items-center gap-4 text-sm">
                <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                <span>Emergency Contact: {client.emergencyContact.name} - {client.emergencyContact.phone}</span>
            </div>
             <Separator />
             <div className="space-y-2">
                <h4 className="font-semibold">Important Notes</h4>
                <p className="text-sm text-muted-foreground">{client.notes}</p>
             </div>
          </CardContent>
        </Card>
        
        <CareLogSection />

      </main>
    </div>
  );
}
