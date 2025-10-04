// src/components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta función de utilidad
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Settings,
  Megaphone // Icono para campañas
} from "lucide-react"; // O la librería de iconos que prefieras

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Clientes', href: '/dashboard/clients', icon: Users },
  { name: 'Campañas', href: '/dashboard/campaigns', icon: Megaphone },
  { name: 'Calendario', href: '/dashboard/calendar', icon: Calendar },
  // Puedes añadir más enlaces aquí
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Megaphone className="h-6 w-6" />
            <span>BrandBoost AI</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-muted text-primary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
           <Link
            href="/dashboard/settings" // Por ejemplo, una página de configuración
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
        </div>
      </div>
    </div>
  );
}