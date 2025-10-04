// src/app/(dashboard)/clients/[id]/edit/page.tsx

import { ClientForm } from "@/components/ui/forms/client-form";
import { getClientById } from "../../actions";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface EditClientPageProps {
  params: { id: string };
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  
  const client = await getClientById(params.id);

  if (!client) {
    notFound(); // Muestra una página 404 si el cliente no existe o no pertenece al usuario
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Cliente: {client.company_name}</h1>
      <ClientForm client={client} />
    </div>
  );
}