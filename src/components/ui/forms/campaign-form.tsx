// src/components/ui/forms/campaign-form.tsx

"use client"; // Este es un Client Component

import { useFormState, useFormStatus } from "react-dom";
import { createCampaign, updateCampaign, CampaignFormData } from "@/app/dashboard/campaigns/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Asegúrate de tener este componente
import { Campaign, CampaignStatus, Client } from "@prisma/client";
import Link from "next/link";

interface CampaignFormProps {
  campaign?: Campaign & { client: Client }; // Opcional, para el modo de edición
  clients: Client[]; // La lista de clientes para el <select>
}

const initialState = {
  message: "",
  errors: {} as Record<string, string[]>,
};

const statusOptions: { value: CampaignStatus; label: string }[] = [
  { value: "DRAFT", label: "Borrador" },
  { value: "IN_REVIEW", label: "En Revisión" },
  { value: "APPROVED", label: "Aprobado" },
  { value: "PUBLISHED", label: "Publicado" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Guardando..." : "Guardar Campaña"}
    </Button>
  );
}

export function CampaignForm({ campaign, clients }: CampaignFormProps) {
  const actionWithId = campaign ? updateCampaign.bind(null, campaign.id) : createCampaign;
  const [state, dispatch] = useFormState(actionWithId, initialState);

  return (
    <form action={dispatch} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="clientId">Cliente</Label>
          <Select name="clientId" defaultValue={campaign?.clientId} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.company_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.clientId && (
            <p className="text-sm text-red-600">{state.errors.clientId.join(", ")}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="title">Título de la Campaña</Label>
          <Input
            id="title"
            name="title"
            defaultValue={campaign?.title || ""}
            aria-describedby="title-error"
          />
          {state.errors?.title && (
            <p id="title-error" className="text-sm text-red-600">
              {state.errors.title.join(", ")}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="platform">Plataforma</Label>
          <Input
            id="platform"
            name="platform"
            defaultValue={campaign?.platform || ""}
            placeholder="Ej: Instagram, Facebook, LinkedIn"
            aria-describedby="platform-error"
          />
          {state.errors?.platform && (
            <p id="platform-error" className="text-sm text-red-600">
              {state.errors.platform.join(", ")}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="draft_count">Número de Borradores a Generar</Label>
          <Input
            id="draft_count"
            name="draft_count"
            type="number"
            min="1"
            defaultValue={campaign?.draft_count || 1}
            aria-describedby="draft_count-error"
          />
          {state.errors?.draft_count && (
            <p id="draft_count-error" className="text-sm text-red-600">
              {state.errors.draft_count.join(", ")}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="ai_instructions">Instrucciones para la IA</Label>
        <Textarea
          id="ai_instructions"
          name="ai_instructions"
          defaultValue={campaign?.ai_instructions || ""}
          rows={4}
          placeholder="Describe el objetivo, tono, y cualquier detalle importante para la generación de contenido..."
          aria-describedby="ai_instructions-error"
        />
        {state.errors?.ai_instructions && (
          <p id="ai_instructions-error" className="text-sm text-red-600">
            {state.errors.ai_instructions.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="status">Estado Inicial</Label>
        <Select name="status" defaultValue={campaign?.status || "DRAFT"}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.errors?.status && (
          <p className="text-sm text-red-600">{state.errors.status.join(", ")}</p>
        )}
      </div>
      {state.message && <p className="text-sm text-red-600">{state.message}</p>}
      <div className="flex gap-2">
        <SubmitButton />
        <Link href="/dashboard/campaigns">
          <Button variant="outline">Cancelar</Button>
        </Link>
      </div>
    </form>
  );
}