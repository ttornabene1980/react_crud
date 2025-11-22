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
import { Textarea } from "@/components/ui/textarea";
import { spesaAPI, voceCostoAPI } from "@/lib/mock-data";
import type { Spesa } from "@/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Autocomplete } from "@/components/autocomplete";

const schema = z.object({
  voceCosto: z.number().min(1, "Voce Costo is required"),
  descrizione: z.string().min(1, "Descrizione is required"),
  dataSpesa: z.string().min(1, "Data Spesa is required"),
  importoSpesa: z.number().min(0, "Importo Spesa must be positive"),
});

export default function SpesaPage() {
  const [data, setData] = React.useState<Spesa[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Spesa | null>(null);

  const form = useForm<Spesa>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      voceCosto: 0,
      descrizione: "",
      dataSpesa: "",
      importoSpesa: 0,
    },
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData(spesaAPI.getAll());
  };

  const voceCostoOptions = React.useMemo(() => {
    return voceCostoAPI.getAll().map((vc) => ({
      value: vc.id,
      label: vc.descrizione,
    }));
  }, []);

  const handleOpenDialog = (item?: Spesa) => {
    if (item) {
      setEditing(item);
      form.reset(item);
    } else {
      setEditing(null);
      form.reset({
        id: 0,
        voceCosto: 0,
        descrizione: "",
        dataSpesa: "",
        importoSpesa: 0,
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(null);
    form.reset();
  };

  const onSubmit = (values: Spesa) => {
    if (editing) {
      spesaAPI.update(editing.id, values);
    } else {
      spesaAPI.create(values);
    }
    loadData();
    handleCloseDialog();
  };

  const handleDelete = (item: Spesa) => {
    if (confirm(`Are you sure you want to delete this spesa?`)) {
      spesaAPI.delete(item.id);
      loadData();
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    {
      key: "voceCosto",
      header: "Voce Costo",
      render: (value: number) => {
        const voceCosto = voceCostoAPI.getById(value);
        return voceCosto?.descrizione || value;
      },
    },
    { key: "descrizione", header: "Descrizione" },
    { key: "dataSpesa", header: "Data Spesa" },
    {
      key: "importoSpesa",
      header: "Importo",
      render: (value: number) => `€${value.toFixed(2)}`,
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Spesa</h1>
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
              <DialogTitle>{editing ? "Edit" : "Create"} Spesa</DialogTitle>
              <DialogDescription>
                {editing
                  ? "Update the spesa information."
                  : "Add a new spesa to the system."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="voceCosto">Voce Costo *</Label>
                <Autocomplete
                  options={voceCostoOptions}
                  value={form.watch("voceCosto")}
                  onValueChange={(value) =>
                    form.setValue("voceCosto", Number(value))
                  }
                />
                {form.formState.errors.voceCosto && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.voceCosto.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descrizione">Descrizione *</Label>
                <Textarea
                  id="descrizione"
                  {...form.register("descrizione")}
                  placeholder="Enter descrizione"
                  rows={3}
                />
                {form.formState.errors.descrizione && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.descrizione.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dataSpesa">Data Spesa *</Label>
                  <Input
                    id="dataSpesa"
                    type="date"
                    {...form.register("dataSpesa")}
                  />
                  {form.formState.errors.dataSpesa && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.dataSpesa.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="importoSpesa">Importo Spesa *</Label>
                  <Input
                    id="importoSpesa"
                    type="number"
                    step="0.01"
                    {...form.register("importoSpesa", { valueAsNumber: true })}
                    placeholder="0.00"
                  />
                  {form.formState.errors.importoSpesa && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.importoSpesa.message}
                    </p>
                  )}
                </div>
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

