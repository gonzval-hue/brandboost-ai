// src/components/client-card.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Client } from "@prisma/client"; // Importa el tipo de Prisma

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="truncate" title={client.company_name}>{client.company_name}</CardTitle>
        <CardDescription>{client.industry}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3" title={client.description}>
          {client.description}
        </p>
      </CardContent>
      <div className="p-4 pt-0 flex justify-between items-center">
        <Link href={`/dashboard/clients/${client.id}`}>
          <Button variant="outline">Ver Detalles</Button>
        </Link>
        <Link href={`/dashboard/clients/${client.id}/edit`}>
          <Button variant="ghost">Editar</Button>
        </Link>
      </div>
    </Card>
  );
}