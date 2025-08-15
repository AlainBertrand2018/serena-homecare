
import { clients } from "@/lib/data";
import { ClientCard } from "./_components/client-card";
import { ClientForm } from "./_components/client-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl md:text-3xl">Clients</h1>
          <ClientForm trigger={<Button><PlusCircle />Ajouter Nouveau Client</Button>} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </main>
    </div>
  );
}
