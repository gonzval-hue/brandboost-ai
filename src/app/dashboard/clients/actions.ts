// src/app/dashboard/clients/actions.ts

'use server';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { z } from "zod";

// Esquema de validación con Zod para la creación/edición de clientes
const ClientSchema = z.object({
  company_name: z.string().min(1, "El nombre de la compañía es requerido."),
  industry: z.string().min(1, "La industria es requerida."),
  description: z.string(),
  brand_values: z.string(),
  tone_of_voice: z.string(),
  visual_style: z.string(),
  target_audience: z.string(),
  keywords: z.string(),
});

type ClientFormData = z.infer<typeof ClientSchema>;

// Función para obtener todos los clientes del usuario autenticado
export async function getClients() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  try {
    const clients = await db.client.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return clients;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw new Error("No se pudieron cargar los clientes.");
  }
}

// Función para obtener un cliente específico por su ID
export async function getClientById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  try {
    const client = await db.client.findFirst({
      where: { id, userId: session.user.id },
    });
    return client;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    throw new Error("No se pudo cargar el cliente.");
  }
}

// Función para crear un nuevo cliente
export async function createClient(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Convertir FormData a un objeto plano
  const data = Object.fromEntries(formData.entries());

  const result = ClientSchema.safeParse(data);
  if (!result.success) {
    console.error("Errores de validación de Zod:", result.error.flatten().fieldErrors);
    return {
      message: "Validación fallida.",
      errors: result.error.flatten().fieldErrors,
    };
  }
  const validatedData = result.data;

  try {
    const newClient = await db.client.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
    });
    // Redirigir después de una creación exitosa
    redirect("/dashboard/clients");
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    return {
      message: "Error al crear el cliente.",
      errors: {},
    };
  }
}

// Función para actualizar un cliente existente
export async function updateClient(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  
  const clientId = formData.get("id") as string;
  if (!clientId) {
    return { message: "ID de cliente no proporcionado.", errors: {} };
  }

  // Convertir FormData a un objeto plano, excluyendo el 'id'
  const { id, ...data } = Object.fromEntries(formData.entries());

  const result = ClientSchema.safeParse(data);
  if (!result.success) {
    console.error("Errores de validación de Zod:", result.error.flatten().fieldErrors);
    return {
      message: "Validación fallida.",
      errors: result.error.flatten().fieldErrors,
    };
  }
  const validatedData = result.data;

  try {
    const updatedClient = await db.client.updateMany({
      where: { id: clientId, userId: session.user.id },
      data: validatedData,
    });

    if (updatedClient.count === 0) {
      throw new Error("Cliente no encontrado o no tienes permiso para editarlo.");
    }
    
    // Redirigir después de una actualización exitosa
    redirect("/dashboard/clients");
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    if (error instanceof Error) {
      return { message: error.message, errors: {} };
    }
    return { message: "Error al actualizar el cliente.", errors: {} };
  }
}

// Función para eliminar un cliente
export async function deleteClient(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  try {
    const deletedClient = await db.client.deleteMany({
      where: { id, userId: session.user.id },
    });
    if (deletedClient.count === 0) {
      throw new Error("Cliente no encontrado o no tienes permiso para eliminarlo.");
    }
    revalidatePath("/dashboard/clients");
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("No se pudo eliminar el cliente.");
  }
}