'use client';

import { useState } from 'react';
import { clients as initialClients, type Client } from "@/lib/data";
import { ClientCard } from "@/app/clients/_components/client-card";
import { ClientForm } from "@/app/clients/_components/client-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients);

  const handleAddClient = (newClientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...newClientData,
      id: `c${Math.random().toString(36).substring(7)}`, // pseudo-random id
    };
    setClients(prev => [...prev, newClient]);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl md:text-3xl">Clients</h1>
        <ClientForm 
          onAddClient={handleAddClient}
          trigger={<Button><PlusCircle />Ajouter Nouveau Client</Button>} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  );
}
