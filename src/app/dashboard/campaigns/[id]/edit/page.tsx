// src/app/(dashboard)/campaigns/[id]/edit/page.tsx

import { CampaignForm } from "@/components/ui/forms/campaign-form";
import { getCampaignById } from "../../actions";
import { getClientsForSelect } from "@/app/dashboard/campaigns/create/page"; // Reutilizamos la función
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface EditCampaignPageProps {
  params: { id: string };
}

export default async function EditCampaignPage({ params }: EditCampaignPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  
  const campaign = await getCampaignById(params.id);
  const clients = await getClientsForSelect();

  if (!campaign) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Campaña: {campaign.title}</h1>
      <CampaignForm campaign={campaign} clients={clients} />
    </div>
  );
}