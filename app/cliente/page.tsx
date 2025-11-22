"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clienteAPI, clienteTipoAPI } from "@/lib/mock-data";
import type { Cliente } from "@/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Autocomplete } from "@/components/autocomplete";

const schema = z.object({
  cliente_tipo: z.string().min(1, "Cliente Tipo is required"),
  denominazione: z.string(),
  cognome: z.string(),
  nome: z.string(),
  indirizzo: z.string(),
});

export default function ClientePage() {
  const [data, setData] = React.useState<Cliente[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Cliente | null>(null);

  const form = useForm<Cliente>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      cliente_tipo: "",
      denominazione: "",
      cognome: "",
      nome: "",
      indirizzo: "",
    },
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData(clienteAPI.getAll());
  };

  const clienteTipoOptions = React.useMemo(() => {
    return clienteTipoAPI.getAll().map((ct) => ({
      value: ct.id,
      label: ct.descrizione,
    }));
  }, []);

  const handleOpenDialog = (item?: Cliente) => {
    if (item) {
      setEditing(item);
      form.reset(item);
    } else {
      setEditing(null);
      form.reset({
        id: 0,
        cliente_tipo: "",
        denominazione: "",
        cognome: "",
        nome: "",
        indirizzo: "",
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(null);
    form.reset();
  };

  const onSubmit = (values: Cliente) => {
    if (editing) {
      clienteAPI.update(editing.id, values);
    } else {
      clienteAPI.create(values);
    }
    loadData();
    handleCloseDialog();
  };

  const handleDelete = (item: Cliente) => {
    const displayName = item.denominazione || `${item.cognome} ${item.nome}`;
    if (confirm(`Are you sure you want to delete "${displayName}"?`)) {
      clienteAPI.delete(item.id);
      loadData();
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    {
      key: "cliente_tipo",
      header: "Tipo",
      render: (value: string) => {
        const tipo = clienteTipoAPI.getById(value);
        return tipo?.descrizione || value;
      },
    },
    { key: "denominazione", header: "Denominazione" },
    { key: "cognome", header: "Cognome" },
    { key: "nome", header: "Nome" },
    { key: "indirizzo", header: "Indirizzo" },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cliente</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Create"} Cliente</DialogTitle>
              <DialogDescription>
                {editing
                  ? "Update the cliente information."
                  : "Add a new cliente to the system."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cliente_tipo">Cliente Tipo *</Label>
                <Autocomplete
                  options={clienteTipoOptions}
                  value={form.watch("cliente_tipo")}
                  onValueChange={(value) =>
                    form.setValue("cliente_tipo", String(value))
                  }
                />
                {form.formState.errors.cliente_tipo && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.cliente_tipo.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="denominazione">Denominazione</Label>
                <Input
                  id="denominazione"
                  {...form.register("denominazione")}
                  placeholder="Enter denominazione"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cognome">Cognome</Label>
                <Input
                  id="cognome"
                  {...form.register("cognome")}
                  placeholder="Enter cognome"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  {...form.register("nome")}
                  placeholder="Enter nome"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="indirizzo">Indirizzo</Label>
                <Input
                  id="indirizzo"
                  {...form.register("indirizzo")}
                  placeholder="Enter indirizzo"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

