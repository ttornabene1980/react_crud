import type {
  ClienteTipo,
  TipoPagamento,
  TipoFatturazione,
  Cliente,
  Impianto,
  Contratto,
  ScadenzaIncasso,
  Fattura,
} from "@/types";

// Mock data storage (in-memory)
let clienteTipi: ClienteTipo[] = [
  { id: "1", descrizione: "Privato" },
  { id: "2", descrizione: "Azienda" },
  { id: "3", descrizione: "Pubblica Amministrazione" },
];

let tipoPagamenti: TipoPagamento[] = [
  { id: "1", descrizione: "Bonifico" },
  { id: "2", descrizione: "Assegno" },
  { id: "3", descrizione: "Contanti" },
  { id: "4", descrizione: "Carta di Credito" },
];

let tipoFatturazioni: TipoFatturazione[] = [
  { id: "1", descrizione: "Mensile", mesi: 1 },
  { id: "2", descrizione: "Trimestrale", mesi: 3 },
  { id: "3", descrizione: "Semestrale", mesi: 6 },
  { id: "4", descrizione: "Annuale", mesi: 12 },
];

let clienti: Cliente[] = [
  {
    id: 1,
    cliente_tipo: "1",
    denominazione: "Rossi S.r.l.",
    cognome: "Rossi",
    nome: "Mario",
    indirizzo: "Via Roma 1, Milano",
  },
  {
    id: 2,
    cliente_tipo: "1",
    denominazione: "",
    cognome: "Bianchi",
    nome: "Luigi",
    indirizzo: "Via Verdi 2, Roma",
  },
];

let impianti: Impianto[] = [
  {
    id: 1,
    codice: "IMP001",
    denominazione: "Impianto Centrale",
    indirizzo: "Via Industria 10, Milano",
    libero: false,
  },
  {
    id: 2,
    codice: "IMP002",
    denominazione: "Impianto Nord",
    indirizzo: "Via Nord 20, Torino",
    libero: true,
  },
];

let contratti: Contratto[] = [
  {
    id: 1,
    cliente: 1,
    impianto: 1,
    durataMese: 12,
    dataInizio: "2024-01-01",
    dataFine: "2024-12-31",
    rinnovabile: true,
    tipoPagamento: "1",
    tipoFatturazione: "2",
    importoContratto: 12000,
  },
];

let scadenzeIncasso: ScadenzaIncasso[] = [
  {
    id: 1,
    contratto: 1,
    dataScadenza: "2024-03-31",
    importoIncasso: 3000,
    tipoPagamento: "1",
    pagato: false,
  },
  {
    id: 2,
    contratto: 1,
    dataScadenza: "2024-06-30",
    importoIncasso: 3000,
    tipoPagamento: "1",
    pagato: false,
  },
];

let fatture: Fattura[] = [];

// Helper functions to get next ID
function getNextId(items: { id: number }[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

function getNextStringId(items: { id: string }[]): string {
  const maxId = items.reduce((max, item) => {
    const numId = parseInt(item.id) || 0;
    return numId > max ? numId : max;
  }, 0);
  return String(maxId + 1);
}

// API functions for ClienteTipo
export const clienteTipoAPI = {
  getAll: () => [...clienteTipi],
  getById: (id: string) => clienteTipi.find((c) => c.id === id),
  create: (data: Omit<ClienteTipo, "id">) => {
    const newItem: ClienteTipo = {
      id: getNextStringId(clienteTipi),
      ...data,
    };
    clienteTipi.push(newItem);
    return newItem;
  },
  update: (id: string, data: Partial<ClienteTipo>) => {
    const index = clienteTipi.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Not found");
    clienteTipi[index] = { ...clienteTipi[index], ...data };
    return clienteTipi[index];
  },
  delete: (id: string) => {
    const index = clienteTipi.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Not found");
    clienteTipi.splice(index, 1);
  },
};

// API functions for TipoPagamento
export const tipoPagamentoAPI = {
  getAll: () => [...tipoPagamenti],
  getById: (id: string) => tipoPagamenti.find((t) => t.id === id),
  create: (data: Omit<TipoPagamento, "id">) => {
    const newItem: TipoPagamento = {
      id: getNextStringId(tipoPagamenti),
      ...data,
    };
    tipoPagamenti.push(newItem);
    return newItem;
  },
  update: (id: string, data: Partial<TipoPagamento>) => {
    const index = tipoPagamenti.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Not found");
    tipoPagamenti[index] = { ...tipoPagamenti[index], ...data };
    return tipoPagamenti[index];
  },
  delete: (id: string) => {
    const index = tipoPagamenti.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Not found");
    tipoPagamenti.splice(index, 1);
  },
};

// API functions for TipoFatturazione
export const tipoFatturazioneAPI = {
  getAll: () => [...tipoFatturazioni],
  getById: (id: string) => tipoFatturazioni.find((t) => t.id === id),
  create: (data: Omit<TipoFatturazione, "id">) => {
    const newItem: TipoFatturazione = {
      id: getNextStringId(tipoFatturazioni),
      ...data,
    };
    tipoFatturazioni.push(newItem);
    return newItem;
  },
  update: (id: string, data: Partial<TipoFatturazione>) => {
    const index = tipoFatturazioni.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Not found");
    tipoFatturazioni[index] = { ...tipoFatturazioni[index], ...data };
    return tipoFatturazioni[index];
  },
  delete: (id: string) => {
    const index = tipoFatturazioni.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Not found");
    tipoFatturazioni.splice(index, 1);
  },
};

// API functions for Cliente
export const clienteAPI = {
  getAll: () => [...clienti],
  getById: (id: number) => clienti.find((c) => c.id === id),
  create: (data: Omit<Cliente, "id">) => {
    const newItem: Cliente = {
      id: getNextId(clienti),
      ...data,
    };
    clienti.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<Cliente>) => {
    const index = clienti.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Not found");
    clienti[index] = { ...clienti[index], ...data };
    return clienti[index];
  },
  delete: (id: number) => {
    const index = clienti.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Not found");
    clienti.splice(index, 1);
  },
};

// API functions for Impianto
export const impiantoAPI = {
  getAll: () => [...impianti],
  getById: (id: number) => impianti.find((i) => i.id === id),
  create: (data: Omit<Impianto, "id">) => {
    const newItem: Impianto = {
      id: getNextId(impianti),
      ...data,
    };
    impianti.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<Impianto>) => {
    const index = impianti.findIndex((i) => i.id === id);
    if (index === -1) throw new Error("Not found");
    impianti[index] = { ...impianti[index], ...data };
    return impianti[index];
  },
  delete: (id: number) => {
    const index = impianti.findIndex((i) => i.id === id);
    if (index === -1) throw new Error("Not found");
    impianti.splice(index, 1);
  },
};

// API functions for Contratto
export const contrattoAPI = {
  getAll: () => [...contratti],
  getById: (id: number) => contratti.find((c) => c.id === id),
  create: (data: Omit<Contratto, "id">) => {
    const newItem: Contratto = {
      id: getNextId(contratti),
      ...data,
    };
    contratti.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<Contratto>) => {
    const index = contratti.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Not found");
    contratti[index] = { ...contratti[index], ...data };
    return contratti[index];
  },
  delete: (id: number) => {
    const index = contratti.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Not found");
    contratti.splice(index, 1);
  },
};

// API functions for ScadenzaIncasso
export const scadenzaIncassoAPI = {
  getAll: () => [...scadenzeIncasso],
  getByContratto: (contrattoId: number) =>
    scadenzeIncasso.filter((s) => s.contratto === contrattoId),
  getById: (id: number) => scadenzeIncasso.find((s) => s.id === id),
  create: (data: Omit<ScadenzaIncasso, "id">) => {
    const newItem: ScadenzaIncasso = {
      id: getNextId(scadenzeIncasso),
      ...data,
    };
    scadenzeIncasso.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<ScadenzaIncasso>) => {
    const index = scadenzeIncasso.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Not found");
    scadenzeIncasso[index] = { ...scadenzeIncasso[index], ...data };
    return scadenzeIncasso[index];
  },
  delete: (id: number) => {
    const index = scadenzeIncasso.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Not found");
    scadenzeIncasso.splice(index, 1);
  },
};

// API functions for Fattura
export const fatturaAPI = {
  getAll: () => [...fatture],
  getByContratto: (contrattoId: number) =>
    fatture.filter((f) => f.contratto === contrattoId),
  getById: (id: number) => fatture.find((f) => f.id === id),
  create: (data: Omit<Fattura, "id">) => {
    const newItem: Fattura = {
      id: getNextId(fatture),
      ...data,
    };
    fatture.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<Fattura>) => {
    const index = fatture.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("Not found");
    fatture[index] = { ...fatture[index], ...data };
    return fatture[index];
  },
  delete: (id: number) => {
    const index = fatture.findIndex((f) => f.id === id);
    if (index === -1) throw new Error("Not found");
    fatture.splice(index, 1);
  },
};

