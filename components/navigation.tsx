"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Cliente Tipo", href: "/cliente-tipo" },
  { name: "Tipo Pagamento", href: "/tipo-pagamento" },
  { name: "Tipo Fatturazione", href: "/tipo-fatturazione" },
  { name: "Cliente", href: "/cliente" },
  { name: "Impianto", href: "/impianto" },
  { name: "Contratto", href: "/contratto" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center gap-4">
        <Link href="/" className="font-bold text-xl">
          Gestionale
        </Link>
        <div className="flex gap-2">
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
      </div>
    </nav>
  );
}

