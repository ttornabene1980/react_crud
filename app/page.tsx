import Link from "next/link";
import { LayoutDashboard, Users, Building2, FileText, DollarSign, Settings } from "lucide-react";

export default function Home() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Overview of key metrics and charts" },
    { name: "Cliente Tipo", href: "/cliente-tipo", icon: Settings, description: "Manage client types and categories" },
    { name: "Tipo Pagamento", href: "/tipo-pagamento", icon: DollarSign, description: "Configure payment methods" },
    { name: "Tipo Fatturazione", href: "/tipo-fatturazione", icon: FileText, description: "Set up billing types" },
    { name: "Cliente", href: "/cliente", icon: Users, description: "Manage client records" },
    { name: "Impianto", href: "/impianto", icon: Building2, description: "Manage facilities and installations" },
    { name: "Contratto", href: "/contratto", icon: FileText, description: "Handle contracts and agreements" },
    { name: "Voce Costo", href: "/voce-costo", icon: Settings, description: "Configure cost items" },
    { name: "Spesa", href: "/spesa", icon: DollarSign, description: "Track expenses" },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Gestionale - Management System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional management system for handling clients, contracts, facilities, and financial operations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Key Features
          </h2>
          <ul className="space-y-3">
            {[
              "Full CRUD operations for all entities",
              "Smart autocomplete for relationships",
              "Inline table editing capabilities",
              "Advanced full-text search",
              "Dynamic column filtering",
              "Form validation with Zod"
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Technology Stack
          </h2>
          <ul className="space-y-3">
            {[
              "React 18 with Next.js 14",
              "TypeScript for type safety",
              "Tailwind CSS styling",
              "shadcn/ui components",
              "React Hook Form",
              "Leaflet for maps"
            ].map((tech, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

