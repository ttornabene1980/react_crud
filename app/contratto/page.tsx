"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table";
import { InlineTable } from "@/components/inline-table";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  contrattoAPI,
  clienteAPI,
  impiantoAPI,
  tipoPagamentoAPI,
  tipoFatturazioneAPI,
  scadenzaIncassoAPI,
  fatturaAPI,
} from "@/lib/mock-data";
import type {
  Contratto,
  ScadenzaIncasso,
  Fattura,
} from "@/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Autocomplete } from "@/components/autocomplete";

const schema = z.object({
  cliente: z.number().min(1, "Cliente is required"),
  impianto: z.number().min(1, "Impianto is required"),
  durataMese: z.number().min(1, "Durata Mese must be at least 1"),
  dataInizio: z.string().min(1, "Data Inizio is required"),
  dataFine: z.string().min(1, "Data Fine is required"),
  rinnovabile: z.boolean(),
  tipoPagamento: z.string().min(1, "Tipo Pagamento is required"),
  tipoFatturazione: z.string().min(1, "Tipo Fatturazione is required"),
  importoContratto: z.number().min(0, "Importo Contratto must be positive"),
});

export default function ContrattoPage() {
  const [data, setData] = React.useState<Contratto[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Contratto | null>(null);
  const [scadenzeIncasso, setScadenzeIncasso] = React.useState<
    ScadenzaIncasso[]
  >([]);
  const [fatture, setFatture] = React.useState<Fattura[]>([]);

  const form = useForm<Contratto>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      cliente: 0,
      impianto: 0,
      durataMese: 12,
      dataInizio: "",
      dataFine: "",
      rinnovabile: false,
      tipoPagamento: "",
      tipoFatturazione: "",
      importoContratto: 0,
    },
  });

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    if (editing) {
      const scadenze = scadenzaIncassoAPI.getByContratto(editing.id);
      const fatt = fatturaAPI.getByContratto(editing.id);
      setScadenzeIncasso(scadenze);
      setFatture(fatt);
    } else {
      setScadenzeIncasso([]);
      setFatture([]);
    }
  }, [editing]);

  const loadData = () => {
    setData(contrattoAPI.getAll());
  };

  const clienteOptions = React.useMemo(() => {
    return clienteAPI.getAll().map((c) => ({
      value: c.id,
      label: c.denominazione || `${c.cognome} ${c.nome}`,
    }));
  }, []);

  const impiantoOptions = React.useMemo(() => {
    return impiantoAPI.getAll().map((i) => ({
      value: i.id,
      label: `${i.codice} - ${i.denominazione}`,
    }));
  }, []);

  const tipoPagamentoOptions = React.useMemo(() => {
    return tipoPagamentoAPI.getAll().map((tp) => ({
      value: tp.id,
      label: tp.descrizione,
    }));
  }, []);

  const tipoFatturazioneOptions = React.useMemo(() => {
    return tipoFatturazioneAPI.getAll().map((tf) => ({
      value: tf.id,
      label: tf.descrizione,
    }));
  }, []);

  const handleOpenDialog = (item?: Contratto) => {
    if (item) {
      setEditing(item);
      form.reset(item);
      const scadenze = scadenzaIncassoAPI.getByContratto(item.id);
      const fatt = fatturaAPI.getByContratto(item.id);
      setScadenzeIncasso(scadenze);
      setFatture(fatt);
    } else {
      setEditing(null);
      form.reset({
        id: 0,
        cliente: 0,
        impianto: 0,
        durataMese: 12,
        dataInizio: "",
        dataFine: "",
        rinnovabile: false,
        tipoPagamento: "",
        tipoFatturazione: "",
        importoContratto: 0,
      });
      setScadenzeIncasso([]);
      setFatture([]);
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(null);
    form.reset();
    setScadenzeIncasso([]);
    setFatture([]);
  };

  const onSubmit = (values: Contratto) => {
    let contrattoId: number;
    if (editing) {
      contrattoAPI.update(editing.id, values);
      contrattoId = editing.id;
    } else {
      const newContratto = contrattoAPI.create(values);
      contrattoId = newContratto.id;
    }

    // Save scadenze incasso
    const existingScadenze = scadenzaIncassoAPI.getByContratto(contrattoId);
    existingScadenze.forEach((s) => {
      if (!scadenzeIncasso.find((si) => si.id === s.id)) {
        scadenzaIncassoAPI.delete(s.id);
      }
    });
    scadenzeIncasso.forEach((si) => {
      if (si.id === 0) {
        scadenzaIncassoAPI.create({ ...si, contratto: contrattoId });
      } else {
        scadenzaIncassoAPI.update(si.id, si);
      }
    });

    // Save fatture
    const existingFatture = fatturaAPI.getByContratto(contrattoId);
    existingFatture.forEach((f) => {
      if (!fatture.find((fa) => fa.id === f.id)) {
        fatturaAPI.delete(f.id);
      }
    });
    fatture.forEach((f) => {
      if (f.id === 0) {
        fatturaAPI.create({ ...f, contratto: contrattoId });
      } else {
        fatturaAPI.update(f.id, f);
      }
    });

    loadData();
    handleCloseDialog();
  };

  const handleDelete = (item: Contratto) => {
    if (confirm(`Are you sure you want to delete contratto #${item.id}?`)) {
      // Delete related scadenze and fatture
      const scadenze = scadenzaIncassoAPI.getByContratto(item.id);
      scadenze.forEach((s) => scadenzaIncassoAPI.delete(s.id));
      const fatt = fatturaAPI.getByContratto(item.id);
      fatt.forEach((f) => fatturaAPI.delete(f.id));
      contrattoAPI.delete(item.id);
      loadData();
    }
  };

  const handleAddScadenzaIncasso = () => {
    const newScadenza: ScadenzaIncasso = {
      id: 0,
      contratto: editing?.id || 0,
      dataScadenza: "",
      importoIncasso: 0,
      tipoPagamento: "",
      pagato: false,
    };
    setScadenzeIncasso([...scadenzeIncasso, newScadenza]);
  };

  const handleUpdateScadenzaIncasso = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...scadenzeIncasso];
    updated[index] = { ...updated[index], [field]: value };
    setScadenzeIncasso(updated);
  };

  const handleDeleteScadenzaIncasso = (index: number) => {
    const updated = scadenzeIncasso.filter((_, i) => i !== index);
    setScadenzeIncasso(updated);
  };

  const handleAddFattura = () => {
    const newFattura: Fattura = {
      id: 0,
      scadenzaIncasso: null,
      contratto: editing?.id || 0,
      note: "",
      dataFattura: "",
      dataPagamento: null,
      tipoPagamento: "",
      importoFatturato: 0,
      iva: 0,
    };
    setFatture([...fatture, newFattura]);
  };

  const handleUpdateFattura = (index: number, field: string, value: any) => {
    const updated = [...fatture];
    updated[index] = { ...updated[index], [field]: value };
    setFatture(updated);
  };

  const handleDeleteFattura = (index: number) => {
    const updated = fatture.filter((_, i) => i !== index);
    setFatture(updated);
  };

  const columns = [
    { key: "id", header: "ID" },
    {
      key: "cliente",
      header: "Cliente",
      render: (value: number) => {
        const cliente = clienteAPI.getById(value);
        return cliente
          ? cliente.denominazione || `${cliente.cognome} ${cliente.nome}`
          : value;
      },
    },
    {
      key: "impianto",
      header: "Impianto",
      render: (value: number) => {
        const impianto = impiantoAPI.getById(value);
        return impianto ? `${impianto.codice} - ${impianto.denominazione}` : value;
      },
    },
    { key: "durataMese", header: "Durata (Mesi)" },
    { key: "dataInizio", header: "Data Inizio" },
    { key: "dataFine", header: "Data Fine" },
    {
      key: "rinnovabile",
      header: "Rinnovabile",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
    { key: "importoContratto", header: "Importo" },
  ];

  const scadenzaColumns = [
    {
      key: "dataScadenza",
      header: "Data Scadenza",
      type: "date" as const,
    },
    {
      key: "importoIncasso",
      header: "Importo Incasso",
      type: "number" as const,
    },
    {
      key: "tipoPagamento",
      header: "Tipo Pagamento",
      type: "autocomplete" as const,
      autocompleteOptions: tipoPagamentoOptions,
    },
    {
      key: "pagato",
      header: "Pagato",
      type: "boolean" as const,
    },
  ];

  const fatturaColumns = React.useMemo(() => {
    const scadenzaOptions = scadenzeIncasso.map((s) => ({
      value: s.id,
      label: `${s.dataScadenza} - €${s.importoIncasso.toFixed(2)}`,
    }));
    // Add a "None" option for nullable field
    const scadenzaOptionsWithNone = [
      { value: 0, label: "None" },
      ...scadenzaOptions,
    ];

    return [
      {
        key: "scadenzaIncasso",
        header: "Scadenza Incasso",
        type: "autocomplete" as const,
        autocompleteOptions: scadenzaOptionsWithNone,
        render: (value: number | null, row: Fattura, onChange: (value: any) => void) => {
          return (
            <Autocomplete
              options={scadenzaOptionsWithNone}
              value={value || 0}
              onValueChange={(newValue) => {
                onChange(newValue === 0 ? null : newValue);
              }}
              className="w-full"
            />
          );
        },
      },
      {
        key: "dataFattura",
        header: "Data Fattura",
        type: "date" as const,
      },
      {
        key: "dataPagamento",
        header: "Data Pagamento",
        type: "date" as const,
      },
      {
        key: "tipoPagamento",
        header: "Tipo Pagamento",
        type: "autocomplete" as const,
        autocompleteOptions: tipoPagamentoOptions,
      },
      {
        key: "importoFatturato",
        header: "Importo Fatturato",
        type: "number" as const,
      },
      {
        key: "iva",
        header: "IVA",
        type: "number" as const,
      },
      {
        key: "note",
        header: "Note",
        type: "textarea" as const,
      },
    ];
  }, [scadenzeIncasso, tipoPagamentoOptions]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contratto</h1>
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
        <DialogContent className="max-w-8xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit" : "Create"} Contratto
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Update the contratto information and related items."
                  : "Add a new contratto to the system."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Autocomplete
                    options={clienteOptions}
                    value={form.watch("cliente")}
                    onValueChange={(value) =>
                      form.setValue("cliente", Number(value))
                    }
                  />
                  {form.formState.errors.cliente && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.cliente.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="impianto">Impianto *</Label>
                  <Autocomplete
                    options={impiantoOptions}
                    value={form.watch("impianto")}
                    onValueChange={(value) =>
                      form.setValue("impianto", Number(value))
                    }
                  />
                  {form.formState.errors.impianto && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.impianto.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="durataMese">Durata (Mesi) *</Label>
                  <Input
                    id="durataMese"
                    type="number"
                    {...form.register("durataMese", { valueAsNumber: true })}
                    placeholder="Enter durata in mesi"
                  />
                  {form.formState.errors.durataMese && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.durataMese.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="importoContratto">Importo Contratto *</Label>
                  <Input
                    id="importoContratto"
                    type="number"
                    step="0.01"
                    {...form.register("importoContratto", {
                      valueAsNumber: true,
                    })}
                    placeholder="Enter importo"
                  />
                  {form.formState.errors.importoContratto && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.importoContratto.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dataInizio">Data Inizio *</Label>
                  <Input
                    id="dataInizio"
                    type="date"
                    {...form.register("dataInizio")}
                  />
                  {form.formState.errors.dataInizio && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.dataInizio.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dataFine">Data Fine *</Label>
                  <Input
                    id="dataFine"
                    type="date"
                    {...form.register("dataFine")}
                  />
                  {form.formState.errors.dataFine && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.dataFine.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tipoPagamento">Tipo Pagamento *</Label>
                  <Autocomplete
                    options={tipoPagamentoOptions}
                    value={form.watch("tipoPagamento")}
                    onValueChange={(value) =>
                      form.setValue("tipoPagamento", String(value))
                    }
                  />
                  {form.formState.errors.tipoPagamento && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.tipoPagamento.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipoFatturazione">Tipo Fatturazione *</Label>
                  <Autocomplete
                    options={tipoFatturazioneOptions}
                    value={form.watch("tipoFatturazione")}
                    onValueChange={(value) =>
                      form.setValue("tipoFatturazione", String(value))
                    }
                  />
                  {form.formState.errors.tipoFatturazione && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.tipoFatturazione.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rinnovabile"
                  checked={form.watch("rinnovabile")}
                  onCheckedChange={(checked) =>
                    form.setValue("rinnovabile", Boolean(checked))
                  }
                />
                <Label htmlFor="rinnovabile">Rinnovabile</Label>
              </div>

              <div className="mt-4">
                <InlineTable
                  title="Scadenze Incasso"
                  data={scadenzeIncasso}
                  columns={scadenzaColumns}
                  onAdd={handleAddScadenzaIncasso}
                  onUpdate={handleUpdateScadenzaIncasso}
                  onDelete={handleDeleteScadenzaIncasso}
                />
              </div>

              <div className="mt-4">
                <InlineTable
                  title="Fatture"
                  data={fatture}
                  columns={fatturaColumns}
                  onAdd={handleAddFattura}
                  onUpdate={handleUpdateFattura}
                  onDelete={handleDeleteFattura}
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

