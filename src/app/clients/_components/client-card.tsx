
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
import { MapPin, Edit, Eye } from "lucide-react";
import type { Client } from "@/lib/data";
import { ClientDetails } from "./client-details";
import { ClientForm } from './client-form';

export function ClientCard({ client }: { client: Client }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={client.avatarUrl} alt={client.name} data-ai-hint="person portrait" />
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{client.name}</CardTitle>
              <CardDescription>Client Profile</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>{client.address}</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
            <Button variant="outline" className="w-full" onClick={() => setDetailsOpen(true)}>
                <Eye/> View Details
            </Button>
            <ClientForm 
                client={client}
                trigger={<Button className="w-full"><Edit/> Edit</Button>}
            />
        </CardFooter>
      </Card>
      <ClientDetails client={client} isOpen={detailsOpen} onOpenChange={setDetailsOpen} />
    </>
  );
}
