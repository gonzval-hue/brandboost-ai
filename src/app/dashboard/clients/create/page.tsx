// src/app/dashboard/clients/create/page.tsx

import { ClientForm } from "@/components/ui/forms/client-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateClientPage() {
  // Verificamos si el usuario tiene una sesión activa.
  // Si no la tiene, lo redirigimos a la página de inicio de sesión.
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Cliente</h1>
      {/* 
        Renderizamos el formulario para crear un cliente.
        No es necesario pasarle datos iniciales, ya que es un formulario de creación.
        El componente ClientForm se encargará de manejar su propio estado y la lógica de envío.
      */}
      <ClientForm />
    </div>
  );
}