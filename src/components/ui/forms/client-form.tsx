// src/components/ui/forms/client-form.tsx

"use client";

import { useActionState, useFormStatus } from "react";
import { createClient, updateClient } from "@/app/dashboard/clients/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Client } from "@prisma/client";
import Link from "next/link";

interface ClientFormProps {
  client?: Client;
}

const initialState = {
  message: "",
  errors: {} as Record<string, string[]>,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? "Guardando..." : "Guardar Cliente"}
    </Button>
  );
}

export function ClientForm({ client }: ClientFormProps) {
  const [state, dispatch] = useActionState(client ? updateClient : createClient, initialState);

  return (
    <form action={dispatch} className="space-y-4 max-w-2xl">
      {/* Campo oculto para el ID en modo de edición */}
      {client && <input type="hidden" name="id" value={client.id} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="company_name">Nombre de la Compañía</Label>
          <Input
            id="company_name"
            name="company_name"
            defaultValue={client?.company_name || ""}
            aria-describedby="company_name-error"
            required
          />
          {state.errors?.company_name && (
            <p id="company_name-error" className="text-sm text-red-600">
              {state.errors.company_name.join(", ")}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="industry">Industria</Label>
          <Input
            id="industry"
            name="industry"
            defaultValue={client?.industry || ""}
            aria-describedby="industry-error"
            required
          />
          {state.errors?.industry && (
            <p id="industry-error" className="text-sm text-red-600">
              {state.errors.industry.join(", ")}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={client?.description || ""}
          rows={3}
          aria-describedby="description-error"
        />
        {state.errors?.description && (
          <p id="description-error" className="text-sm text-red-600">
            {state.errors.description.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="brand_values">Valores de Marca</Label>
        <Textarea
          id="brand_values"
          name="brand_values"
          defaultValue={client?.brand_values || ""}
          rows={2}
          aria-describedby="brand_values-error"
        />
        {state.errors?.brand_values && (
          <p id="brand_values-error" className="text-sm text-red-600">
            {state.errors.brand_values.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="tone_of_voice">Tono de Voz</Label>
        <Input
          id="tone_of_voice"
          name="tone_of_voice"
          defaultValue={client?.tone_of_voice || ""}
          aria-describedby="tone_of_voice-error"
        />
        {state.errors?.tone_of_voice && (
          <p id="tone_of_voice-error" className="text-sm text-red-600">
            {state.errors.tone_of_voice.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="visual_style">Estilo Visual</Label>
        <Input
          id="visual_style"
          name="visual_style"
          defaultValue={client?.visual_style || ""}
          aria-describedby="visual_style-error"
        />
        {state.errors?.visual_style && (
          <p id="visual_style-error" className="text-sm text-red-600">
            {state.errors.visual_style.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="target_audience">Público Objetivo</Label>
        <Textarea
          id="target_audience"
          name="target_audience"
          defaultValue={client?.target_audience || ""}
          rows={2}
          aria-describedby="target_audience-error"
        />
        {state.errors?.target_audience && (
          <p id="target_audience-error" className="text-sm text-red-600">
            {state.errors.target_audience.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="keywords">Palabras Clave</Label>
        <Textarea
          id="keywords"
          name="keywords"
          defaultValue={client?.keywords || ""}
          rows={2}
          aria-describedby="keywords-error"
        />
        {state.errors?.keywords && (
          <p id="keywords-error" className="text-sm text-red-600">
            {state.errors.keywords.join(", ")}
          </p>
        )}
      </div>
      {state.message && <p className="text-sm text-red-600">{state.message}</p>}
      <div className="flex gap-2">
        <SubmitButton />
        <Link href="/dashboard/clients">
          <Button variant="outline">Cancelar</Button>
        </Link>
      </div>
    </form>
  );
}