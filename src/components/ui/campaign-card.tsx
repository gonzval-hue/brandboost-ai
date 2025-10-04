// src/components/ui/campaign-card.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Campaign, CampaignStatus } from "@prisma/client";

interface CampaignCardProps {
  campaign: Campaign & { client: { id: string; company_name: string } }; // El tipo debe incluir el cliente
}

const statusLabels: Record<CampaignStatus, string> = {
  DRAFT: "Borrador",
  IN_REVIEW: "En Revisión",
  APPROVED: "Aprobado",
  PUBLISHED: "Publicado",
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="truncate" title={campaign.title}>{campaign.title}</CardTitle>
            <CardDescription>
              Cliente: {campaign.client.company_name} | Plataforma: {campaign.platform}
            </CardDescription>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {statusLabels[campaign.status]}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {campaign.ai_instructions || "Sin instrucciones de IA."}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <Link href={`/dashboard/campaigns/${campaign.id}`}>
            <Button variant="outline" size="sm">Ver Detalles</Button>
          </Link>
          <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
            <Button variant="ghost" size="sm">Editar</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}