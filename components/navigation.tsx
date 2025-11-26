"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Cliente Tipo", href: "/cliente-tipo" },
  { name: "Tipo Pagamento", href: "/tipo-pagamento" },
  { name: "Tipo Fatturazione", href: "/tipo-fatturazione" },
  { name: "Cliente", href: "/cliente" },
  { name: "Impianto", href: "/impianto" },
  { name: "Contratto", href: "/contratto" },
  { name: "Voce Costo", href: "/voce-costo" },
  { name: "Spesa", href: "/spesa" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4">
        <Link href="/" className="font-bold text-xl mr-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Gestionale
        </Link>
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}

