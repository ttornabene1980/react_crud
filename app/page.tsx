import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const menuItems = [
    { name: "Cliente Tipo", href: "/cliente-tipo" },
    { name: "Tipo Pagamento", href: "/tipo-pagamento" },
    { name: "Tipo Fatturazione", href: "/tipo-fatturazione" },
    { name: "Cliente", href: "/cliente" },
    { name: "Impianto", href: "/impianto" },
    { name: "Contratto", href: "/contratto" },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Gestionale - Management System</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to the management system. Select a module from the list below to
        get started.
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Module</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.href}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  Manage {item.name.toLowerCase()} records with full CRUD
                  operations
                </TableCell>
                <TableCell className="text-right">
                  <Link href={item.href}>
                    <Button variant="outline">Open</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Full CRUD operations for all tables</li>
          <li>Autocomplete components for foreign key relationships</li>
          <li>Inline table editing for one-to-many relationships</li>
          <li>Full-text search across all text columns</li>
          <li>Column filters with unique values</li>
          <li>Form validation with Zod and React Hook Form</li>
        </ul>
      </div>
    </div>
  );
}

