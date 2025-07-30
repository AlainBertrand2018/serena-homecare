
import { clients } from "@/lib/data";
import { ClientCard } from "@/app/clients/_components/client-card";
import { ClientForm } from "@/app/clients/_components/client-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminClientsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl md:text-3xl">Clients</h1>
        <ClientForm trigger={<Button><PlusCircle />Add New Client</Button>} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  );
}
