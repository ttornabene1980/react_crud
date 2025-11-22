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
import { tipoPagamentoAPI } from "@/lib/mock-data";
import type { TipoPagamento } from "@/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  descrizione: z.string().min(1, "Descrizione is required"),
});

export default function TipoPagamentoPage() {
  const [data, setData] = React.useState<TipoPagamento[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<TipoPagamento | null>(null);

  const form = useForm<TipoPagamento>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      descrizione: "",
    },
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData(tipoPagamentoAPI.getAll());
  };

  const handleOpenDialog = (item?: TipoPagamento) => {
    if (item) {
      setEditing(item);
      form.reset(item);
    } else {
      setEditing(null);
      form.reset({ id: "", descrizione: "" });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(null);
    form.reset();
  };

  const onSubmit = (values: TipoPagamento) => {
    if (editing) {
      tipoPagamentoAPI.update(editing.id, values);
    } else {
      tipoPagamentoAPI.create(values);
    }
    loadData();
    handleCloseDialog();
  };

  const handleDelete = (item: TipoPagamento) => {
    if (confirm(`Are you sure you want to delete "${item.descrizione}"?`)) {
      tipoPagamentoAPI.delete(item.id);
      loadData();
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "descrizione", header: "Descrizione" },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tipo Pagamento</h1>
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
                {editing ? "Edit" : "Create"} Tipo Pagamento
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Update the tipo pagamento information."
                  : "Add a new tipo pagamento to the system."}
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

