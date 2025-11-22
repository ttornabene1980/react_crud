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
import { tipoFatturazioneAPI } from "@/lib/mock-data";
import type { TipoFatturazione } from "@/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  descrizione: z.string().min(1, "Descrizione is required"),
  mesi: z.number().min(1, "Mesi must be at least 1"),
});

export default function TipoFatturazionePage() {
  const [data, setData] = React.useState<TipoFatturazione[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<TipoFatturazione | null>(null);

  const form = useForm<TipoFatturazione>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      descrizione: "",
      mesi: 1,
    },
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData(tipoFatturazioneAPI.getAll());
  };

  const handleOpenDialog = (item?: TipoFatturazione) => {
    if (item) {
      setEditing(item);
      form.reset(item);
    } else {
      setEditing(null);
      form.reset({ id: "", descrizione: "", mesi: 1 });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(null);
    form.reset();
  };

  const onSubmit = (values: TipoFatturazione) => {
    if (editing) {
      tipoFatturazioneAPI.update(editing.id, values);
    } else {
      tipoFatturazioneAPI.create(values);
    }
    loadData();
    handleCloseDialog();
  };

  const handleDelete = (item: TipoFatturazione) => {
    if (confirm(`Are you sure you want to delete "${item.descrizione}"?`)) {
      tipoFatturazioneAPI.delete(item.id);
      loadData();
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "descrizione", header: "Descrizione" },
    { key: "mesi", header: "Mesi" },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tipo Fatturazione</h1>
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
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit" : "Create"} Tipo Fatturazione
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Update the tipo fatturazione information."
                  : "Add a new tipo fatturazione to the system."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="descrizione">Descrizione</Label>
                <Input
                  id="descrizione"
                  {...form.register("descrizione")}
                  placeholder="Enter descrizione"
                />
                {form.formState.errors.descrizione && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.descrizione.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mesi">Mesi</Label>
                <Input
                  id="mesi"
                  type="number"
                  {...form.register("mesi", { valueAsNumber: true })}
                  placeholder="Enter mesi"
                />
                {form.formState.errors.mesi && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.mesi.message}
                  </p>
                )}
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

