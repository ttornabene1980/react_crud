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
import { Checkbox } from "@/components/ui/checkbox";
import { impiantoAPI } from "@/lib/mock-data";
import { geocodeAddress } from "@/lib/geocoding";
import { Map } from "@/components/map";
import type { Impianto } from "@/types";
import { Plus, MapPin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  codice: z.string().min(1, "Codice is required"),
  denominazione: z.string().min(1, "Denominazione is required"),
  indirizzo: z.string(),
  libero: z.boolean(),
  latitudine: z.number().optional(),
  longitudine: z.number().optional(),
});

export default function ImpiantoPage() {
  const [data, setData] = React.useState<Impianto[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Impianto | null>(null);
  const [geocoding, setGeocoding] = React.useState(false);

  const form = useForm<Impianto>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      codice: "",
      denominazione: "",
      indirizzo: "",
      libero: false,
      latitudine: undefined,
      longitudine: undefined,
    },
  });

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setData(impiantoAPI.getAll());
  };

  const handleOpenDialog = (item?: Impianto) => {
    if (item) {
      setEditing(item);
      form.reset(item);
    } else {
      setEditing(null);
      form.reset({
        id: 0,
        codice: "",
        denominazione: "",
        indirizzo: "",
        libero: false,
        latitudine: undefined,
        longitudine: undefined,
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(null);
    form.reset();
    setGeocoding(false);
  };

  const handleGeocode = async () => {
    const address = form.watch("indirizzo");
    if (!address || address.trim() === "") {
      alert("Please enter an address first");
      return;
    }

    setGeocoding(true);
    try {
      const result = await geocodeAddress(address);
      if (result) {
        form.setValue("latitudine", result.lat);
        form.setValue("longitudine", result.lon);
      } else {
        alert("Could not find coordinates for this address. Please check the address and try again.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error geocoding address. Please try again.");
    } finally {
      setGeocoding(false);
    }
  };

  const onSubmit = (values: Impianto) => {
    // Ensure we get all form values including coordinates set programmatically
    const allValues = form.getValues();
    const dataToSave: Impianto = {
      ...values,
      latitudine: allValues.latitudine,
      longitudine: allValues.longitudine,
    };
    
    if (editing) {
      impiantoAPI.update(editing.id, dataToSave);
    } else {
      impiantoAPI.create(dataToSave);
    }
    loadData();
    handleCloseDialog();
  };

  const handleDelete = (item: Impianto) => {
    if (confirm(`Are you sure you want to delete "${item.denominazione}"?`)) {
      impiantoAPI.delete(item.id);
      loadData();
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "codice", header: "Codice" },
    { key: "denominazione", header: "Denominazione" },
    { key: "indirizzo", header: "Indirizzo" },
    {
      key: "libero",
      header: "Libero",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Impianto</h1>
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
              <DialogTitle>{editing ? "Edit" : "Create"} Impianto</DialogTitle>
              <DialogDescription>
                {editing
                  ? "Update the impianto information."
                  : "Add a new impianto to the system."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="codice">Codice *</Label>
                <Input
                  id="codice"
                  {...form.register("codice")}
                  placeholder="Enter codice"
                />
                {form.formState.errors.codice && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.codice.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="denominazione">Denominazione *</Label>
                <Input
                  id="denominazione"
                  {...form.register("denominazione")}
                  placeholder="Enter denominazione"
                />
                {form.formState.errors.denominazione && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.denominazione.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="indirizzo" className="flex-1">Indirizzo</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGeocode}
                    disabled={geocoding || !form.watch("indirizzo")}
                  >
                    {geocoding ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Geocoding...
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Get Coordinates
                      </>
                    )}
                  </Button>
                </div>
                <Input
                  id="indirizzo"
                  {...form.register("indirizzo")}
                  placeholder="Enter indirizzo"
                />
                {(form.watch("latitudine") && form.watch("longitudine")) && (
                  <div className="text-sm text-muted-foreground">
                    Coordinates: {form.watch("latitudine")?.toFixed(6)}, {form.watch("longitudine")?.toFixed(6)}
                  </div>
                )}
              </div>
              {form.watch("latitudine") && form.watch("longitudine") && (
                <div className="grid gap-2">
                  <Label>Map</Label>
                  <Map
                    key={`${form.watch("latitudine")}-${form.watch("longitudine")}`}
                    latitude={form.watch("latitudine")!}
                    longitude={form.watch("longitudine")!}
                    address={form.watch("indirizzo")}
                    height="300px"
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="libero"
                  checked={form.watch("libero")}
                  onCheckedChange={(checked) =>
                    form.setValue("libero", Boolean(checked))
                  }
                />
                <Label htmlFor="libero">Libero</Label>
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

