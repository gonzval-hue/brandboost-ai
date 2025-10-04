// src/app/(dashboard)/campaigns/page.tsx

import { Suspense } from "react";
import { CampaignCard } from "@/components/ui/campaign-card"; // Lo crearemos después
import { getCampaigns } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign } from "@prisma/client";

function CampaignsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  );
}

async function CampaignsList() {
  const campaigns: Campaign[] = await getCampaigns();

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No hay campañas creadas aún.</p>
        <Link href="/dashboard/campaigns/create">
          <Button className="mt-4">Crea tu primera campaña</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}

export default function CampaignsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campañas</h1>
        <Link href="/dashboard/campaigns/create">
          <Button>Crear Nueva Campaña</Button>
        </Link>
      </div>
      <Suspense fallback={<CampaignsLoadingSkeleton />}>
        <CampaignsList />
      </Suspense>
    </div>
  );
}