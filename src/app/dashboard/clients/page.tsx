// src/app/(dashboard)/clients/page.tsx

import { Suspense } from "react";
import { ClientCard } from "@/components/ui/client-card"; // Lo crearemos después
import { getClients } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Asegúrate de tener este componente de ShadCN

// Componente para mostrar mientras se cargan los datos
function ClientsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48" />
      ))}
    </div>
  );
}

async function ClientsList() {
  const clients = await getClients();

  if (clients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No tienes clientes aún.</p>
        <Link href="/dashboard/clients/create">
          <Button className="mt-4">Crea tu primer cliente</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
}

export default function ClientsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Link href="/dashboard/clients/create">
          <Button>Añadir Cliente</Button>
        </Link>
      </div>
      <Suspense fallback={<ClientsLoadingSkeleton />}>
        <ClientsList />
      </Suspense>
    </div>
  );
}