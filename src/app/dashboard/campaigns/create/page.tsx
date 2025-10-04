// src/app/(dashboard)/campaigns/create/page.tsx

import { CampaignForm } from "@/components/ui/forms/campaign-form"; // Lo crearemos después
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db"; // Importamos db para obtener la lista de clientes

// Función para obtener todos los clientes para el <select>
async function getClientsForSelect() {
  const clients = await db.client.findMany({
    select: { id: true, company_name: true },
    orderBy: { company_name: "asc" },
  });
  return clients;
}

export default async function CreateCampaignPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  const clients = await getClientsForSelect();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Nueva Campaña</h1>
      <CampaignForm clients={clients} /> {/* Pasamos los clientes al formulario */}
    </div>
  );
}