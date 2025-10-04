// src/app/(dashboard)/campaigns/actions.ts

'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { z } from "zod";

// Esquema de validación con Zod para la creación/edición de campañas
const CampaignSchema = z.object({
  clientId: z.string().min(1, "El cliente es requerido."),
  title: z.string().min(1, "El título de la campaña es requerido."),
  platform: z.string().min(1, "La plataforma es requerida."),
  draft_count: z.coerce.number().int().positive().default(1),
  ai_instructions: z.string(),
  status: z.enum(["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED"]).default("DRAFT"),
});

type CampaignFormData = z.infer<typeof CampaignSchema>;

// Función para obtener todas las campañas (globales)
export async function getCampaigns() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const campaigns = await db.campaign.findMany({
      include: { // Incluimos datos del cliente asociado para mostrarlos
        client: {
          select: {
            id: true,
            company_name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return campaigns;
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    throw new Error("No se pudieron cargar las campañas.");
  }
}

// Función para obtener una campaña específica por su ID (global)
export async function getCampaignById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  try {
    const campaign = await db.campaign.findUnique({
      where: { id },
      include: { client: true }, // Incluimos el cliente para el formulario de edición
    });
    return campaign;
  } catch (error) {
    console.error("Error al obtener la campaña:", error);
    throw new Error("No se pudo cargar la campaña.");
  }
}

// Función para crear una nueva campaña (global)
export async function createCampaign(data: CampaignFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  const validatedData = CampaignSchema.parse(data);

  try {
    const newCampaign = await db.campaign.create({
      data: validatedData,
    });
    return newCampaign;
  } catch (error) {
    console.error("Error al crear la campaña:", error);
    throw new Error("No se pudo crear la campaña.");
  }
}

// Función para actualizar una campaña existente (global)
export async function updateCampaign(id: string, data: CampaignFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  const validatedData = CampaignSchema.parse(data);

  try {
    const updatedCampaign = await db.campaign.update({
      where: { id },
      data: validatedData,
    });
    return updatedCampaign;
  } catch (error) {
    console.error("Error al actualizar la campaña:", error);
    throw new Error("No se pudo actualizar la campaña.");
  }
}

// Función para eliminar una campaña (global)
export async function deleteCampaign(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  try {
    await db.campaign.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la campaña:", error);
    throw new Error("No se pudo eliminar la campaña.");
  }
}