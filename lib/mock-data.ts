import type {
  ClienteTipo,
  TipoPagamento,
  TipoFatturazione,
  Cliente,
  Impianto,
  Contratto,
  ScadenzaIncasso,
  Fattura,
  VoceCosto,
  Spesa,
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
    latitudine: 45.4642,
    longitudine: 9.1900,
  },
  {
    id: 2,
    codice: "IMP002",
    denominazione: "Impianto Nord",
    indirizzo: "Via Nord 20, Torino",
    libero: true,
    latitudine: 45.0703,
    longitudine: 7.6869,
  },
];

let contratti: Contratto[] = [
  // 2022
  {
    id: 1,
    cliente: 1,
    impianto: 1,
    durataMese: 12,
    dataInizio: "2022-01-01",
    dataFine: "2022-12-31",
    rinnovabile: true,
    tipoPagamento: "1",
    tipoFatturazione: "2",
    importoContratto: 10000,
  },
  {
    id: 2,
    cliente: 2,
    impianto: 2,
    durataMese: 6,
    dataInizio: "2022-06-01",
    dataFine: "2022-11-30",
    rinnovabile: false,
    tipoPagamento: "2",
    tipoFatturazione: "1",
    importoContratto: 5000,
  },
  // 2023
  {
    id: 3,
    cliente: 1,
    impianto: 1,
    durataMese: 12,
    dataInizio: "2023-01-01",
    dataFine: "2023-12-31",
    rinnovabile: true,
    tipoPagamento: "1",
    tipoFatturazione: "2",
    importoContratto: 11000,
  },
  {
    id: 4,
    cliente: 2,
    impianto: 2,
    durataMese: 12,
    dataInizio: "2023-03-01",
    dataFine: "2024-02-28",
    rinnovabile: true,
    tipoPagamento: "1",
    tipoFatturazione: "3",
    importoContratto: 8000,
  },
  // 2024
  {
    id: 5,
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
  {
    id: 6,
    cliente: 2,
    impianto: 2,
    durataMese: 6,
    dataInizio: "2024-03-01",
    dataFine: "2024-08-31",
    rinnovabile: false,
    tipoPagamento: "2",
    tipoFatturazione: "1",
    importoContratto: 6000,
  },
  // 2025
  {
    id: 7,
    cliente: 1,
    impianto: 1,
    durataMese: 12,
    dataInizio: "2025-01-01",
    dataFine: "2025-12-31",
    rinnovabile: true,
    tipoPagamento: "1",
    tipoFatturazione: "2",
    importoContratto: 13000,
  },
];

let scadenzeIncasso: ScadenzaIncasso[] = [
  // Contratto 1 (2022) - Trimestrale
  { id: 1, contratto: 1, dataScadenza: "2022-03-31", importoIncasso: 2500, tipoPagamento: "1", pagato: true },
  { id: 2, contratto: 1, dataScadenza: "2022-06-30", importoIncasso: 2500, tipoPagamento: "1", pagato: true },
  { id: 3, contratto: 1, dataScadenza: "2022-09-30", importoIncasso: 2500, tipoPagamento: "1", pagato: true },
  { id: 4, contratto: 1, dataScadenza: "2022-12-31", importoIncasso: 2500, tipoPagamento: "1", pagato: true },
  // Contratto 2 (2022) - Mensile
  { id: 5, contratto: 2, dataScadenza: "2022-07-31", importoIncasso: 833, tipoPagamento: "2", pagato: true },
  { id: 6, contratto: 2, dataScadenza: "2022-08-31", importoIncasso: 833, tipoPagamento: "2", pagato: true },
  { id: 7, contratto: 2, dataScadenza: "2022-09-30", importoIncasso: 834, tipoPagamento: "2", pagato: true },
  { id: 8, contratto: 2, dataScadenza: "2022-10-31", importoIncasso: 833, tipoPagamento: "2", pagato: true },
  { id: 9, contratto: 2, dataScadenza: "2022-11-30", importoIncasso: 833, tipoPagamento: "2", pagato: true },
  // Contratto 3 (2023) - Trimestrale
  { id: 10, contratto: 3, dataScadenza: "2023-03-31", importoIncasso: 2750, tipoPagamento: "1", pagato: true },
  { id: 11, contratto: 3, dataScadenza: "2023-06-30", importoIncasso: 2750, tipoPagamento: "1", pagato: true },
  { id: 12, contratto: 3, dataScadenza: "2023-09-30", importoIncasso: 2750, tipoPagamento: "1", pagato: true },
  { id: 13, contratto: 3, dataScadenza: "2023-12-31", importoIncasso: 2750, tipoPagamento: "1", pagato: true },
  // Contratto 4 (2023) - Semestrale
  { id: 14, contratto: 4, dataScadenza: "2023-09-30", importoIncasso: 4000, tipoPagamento: "1", pagato: true },
  { id: 15, contratto: 4, dataScadenza: "2024-03-31", importoIncasso: 4000, tipoPagamento: "1", pagato: true },
  // Contratto 5 (2024) - Trimestrale
  { id: 16, contratto: 5, dataScadenza: "2024-03-31", importoIncasso: 3000, tipoPagamento: "1", pagato: true },
  { id: 17, contratto: 5, dataScadenza: "2024-06-30", importoIncasso: 3000, tipoPagamento: "1", pagato: false },
  { id: 18, contratto: 5, dataScadenza: "2024-09-30", importoIncasso: 3000, tipoPagamento: "1", pagato: false },
  { id: 19, contratto: 5, dataScadenza: "2024-12-31", importoIncasso: 3000, tipoPagamento: "1", pagato: false },
  // Contratto 6 (2024) - Mensile
  { id: 20, contratto: 6, dataScadenza: "2024-04-30", importoIncasso: 1000, tipoPagamento: "2", pagato: true },
  { id: 21, contratto: 6, dataScadenza: "2024-05-31", importoIncasso: 1000, tipoPagamento: "2", pagato: true },
  { id: 22, contratto: 6, dataScadenza: "2024-06-30", importoIncasso: 1000, tipoPagamento: "2", pagato: false },
  { id: 23, contratto: 6, dataScadenza: "2024-07-31", importoIncasso: 1000, tipoPagamento: "2", pagato: false },
  { id: 24, contratto: 6, dataScadenza: "2024-08-31", importoIncasso: 1000, tipoPagamento: "2", pagato: false },
  // Contratto 7 (2025) - Trimestrale
  { id: 25, contratto: 7, dataScadenza: "2025-03-31", importoIncasso: 3250, tipoPagamento: "1", pagato: false },
  { id: 26, contratto: 7, dataScadenza: "2025-06-30", importoIncasso: 3250, tipoPagamento: "1", pagato: false },
  { id: 27, contratto: 7, dataScadenza: "2025-09-30", importoIncasso: 3250, tipoPagamento: "1", pagato: false },
  { id: 28, contratto: 7, dataScadenza: "2025-12-31", importoIncasso: 3250, tipoPagamento: "1", pagato: false },
];

let fatture: Fattura[] = [
  // 2022
  { id: 1, scadenzaIncasso: 1, contratto: 1, note: "Fattura Q1 2022", dataFattura: "2022-03-15", dataPagamento: "2022-04-10", tipoPagamento: "1", importoFatturato: 2500, iva: 550 },
  { id: 2, scadenzaIncasso: 2, contratto: 1, note: "Fattura Q2 2022", dataFattura: "2022-06-15", dataPagamento: "2022-07-05", tipoPagamento: "1", importoFatturato: 2500, iva: 550 },
  { id: 3, scadenzaIncasso: 3, contratto: 1, note: "Fattura Q3 2022", dataFattura: "2022-09-15", dataPagamento: "2022-10-12", tipoPagamento: "1", importoFatturato: 2500, iva: 550 },
  { id: 4, scadenzaIncasso: 4, contratto: 1, note: "Fattura Q4 2022", dataFattura: "2022-12-15", dataPagamento: "2023-01-08", tipoPagamento: "1", importoFatturato: 2500, iva: 550 },
  { id: 5, scadenzaIncasso: 5, contratto: 2, note: "Fattura luglio 2022", dataFattura: "2022-07-20", dataPagamento: "2022-08-01", tipoPagamento: "2", importoFatturato: 833, iva: 183 },
  { id: 6, scadenzaIncasso: 6, contratto: 2, note: "Fattura agosto 2022", dataFattura: "2022-08-20", dataPagamento: "2022-09-05", tipoPagamento: "2", importoFatturato: 833, iva: 183 },
  // 2023
  { id: 7, scadenzaIncasso: 10, contratto: 3, note: "Fattura Q1 2023", dataFattura: "2023-03-15", dataPagamento: "2023-04-10", tipoPagamento: "1", importoFatturato: 2750, iva: 605 },
  { id: 8, scadenzaIncasso: 11, contratto: 3, note: "Fattura Q2 2023", dataFattura: "2023-06-15", dataPagamento: "2023-07-05", tipoPagamento: "1", importoFatturato: 2750, iva: 605 },
  { id: 9, scadenzaIncasso: 12, contratto: 3, note: "Fattura Q3 2023", dataFattura: "2023-09-15", dataPagamento: "2023-10-12", tipoPagamento: "1", importoFatturato: 2750, iva: 605 },
  { id: 10, scadenzaIncasso: 13, contratto: 3, note: "Fattura Q4 2023", dataFattura: "2023-12-15", dataPagamento: "2024-01-08", tipoPagamento: "1", importoFatturato: 2750, iva: 605 },
  { id: 11, scadenzaIncasso: 14, contratto: 4, note: "Fattura semestrale H1 2023", dataFattura: "2023-09-20", dataPagamento: "2023-10-15", tipoPagamento: "1", importoFatturato: 4000, iva: 880 },
  // 2024
  { id: 12, scadenzaIncasso: 15, contratto: 4, note: "Fattura semestrale H2 2023", dataFattura: "2024-03-20", dataPagamento: "2024-04-10", tipoPagamento: "1", importoFatturato: 4000, iva: 880 },
  { id: 13, scadenzaIncasso: 16, contratto: 5, note: "Fattura Q1 2024", dataFattura: "2024-03-15", dataPagamento: "2024-04-10", tipoPagamento: "1", importoFatturato: 3000, iva: 660 },
  { id: 14, scadenzaIncasso: 17, contratto: 5, note: "Fattura Q2 2024", dataFattura: "2024-06-15", dataPagamento: null, tipoPagamento: "1", importoFatturato: 3000, iva: 660 },
  { id: 15, scadenzaIncasso: 20, contratto: 6, note: "Fattura aprile 2024", dataFattura: "2024-04-20", dataPagamento: "2024-05-05", tipoPagamento: "2", importoFatturato: 1000, iva: 220 },
  { id: 16, scadenzaIncasso: 21, contratto: 6, note: "Fattura maggio 2024", dataFattura: "2024-05-20", dataPagamento: "2024-06-05", tipoPagamento: "2", importoFatturato: 1000, iva: 220 },
  { id: 17, scadenzaIncasso: 22, contratto: 6, note: "Fattura giugno 2024", dataFattura: "2024-06-20", dataPagamento: null, tipoPagamento: "2", importoFatturato: 1000, iva: 220 },
  // 2025
  { id: 18, scadenzaIncasso: 25, contratto: 7, note: "Fattura Q1 2025", dataFattura: "2025-03-15", dataPagamento: null, tipoPagamento: "1", importoFatturato: 3250, iva: 715 },
];

let vociCosto: VoceCosto[] = [
  { id: 1, descrizione: "Manutenzione" },
  { id: 2, descrizione: "Materiali" },
  { id: 3, descrizione: "Personale" },
  { id: 4, descrizione: "Utenze" },
];

let spese: Spesa[] = [
  // 2022
  { id: 1, voceCosto: 3, descrizione: "Stipendio personale gennaio 2022", dataSpesa: "2022-01-31", importoSpesa: 2800.0 },
  { id: 2, voceCosto: 4, descrizione: "Bolletta elettrica gennaio 2022", dataSpesa: "2022-02-15", importoSpesa: 420.0 },
  { id: 3, voceCosto: 1, descrizione: "Manutenzione impianto", dataSpesa: "2022-03-10", importoSpesa: 450.0 },
  { id: 4, voceCosto: 2, descrizione: "Materiali di consumo", dataSpesa: "2022-04-05", importoSpesa: 320.0 },
  { id: 5, voceCosto: 3, descrizione: "Stipendio personale maggio 2022", dataSpesa: "2022-05-31", importoSpesa: 2800.0 },
  { id: 6, voceCosto: 4, descrizione: "Bolletta gas", dataSpesa: "2022-06-20", importoSpesa: 380.0 },
  { id: 7, voceCosto: 1, descrizione: "Riparazione urgente", dataSpesa: "2022-08-15", importoSpesa: 600.0 },
  { id: 8, voceCosto: 2, descrizione: "Acquisto ricambi", dataSpesa: "2022-09-12", importoSpesa: 550.0 },
  { id: 9, voceCosto: 3, descrizione: "Stipendio personale ottobre 2022", dataSpesa: "2022-10-31", importoSpesa: 2800.0 },
  { id: 10, voceCosto: 4, descrizione: "Bolletta elettrica novembre", dataSpesa: "2022-11-15", importoSpesa: 420.0 },
  // 2023
  { id: 11, voceCosto: 3, descrizione: "Stipendio personale gennaio 2023", dataSpesa: "2023-01-31", importoSpesa: 2900.0 },
  { id: 12, voceCosto: 4, descrizione: "Bolletta elettrica febbraio 2023", dataSpesa: "2023-02-15", importoSpesa: 440.0 },
  { id: 13, voceCosto: 1, descrizione: "Manutenzione programmata", dataSpesa: "2023-03-20", importoSpesa: 500.0 },
  { id: 14, voceCosto: 2, descrizione: "Materiali di consumo Q1", dataSpesa: "2023-04-10", importoSpesa: 380.0 },
  { id: 15, voceCosto: 3, descrizione: "Stipendio personale maggio 2023", dataSpesa: "2023-05-31", importoSpesa: 2900.0 },
  { id: 16, voceCosto: 4, descrizione: "Bolletta gas estate", dataSpesa: "2023-07-18", importoSpesa: 350.0 },
  { id: 17, voceCosto: 1, descrizione: "Upgrade impianto", dataSpesa: "2023-08-25", importoSpesa: 1200.0 },
  { id: 18, voceCosto: 2, descrizione: "Acquisto attrezzature", dataSpesa: "2023-09-15", importoSpesa: 850.0 },
  { id: 19, voceCosto: 3, descrizione: "Stipendio personale ottobre 2023", dataSpesa: "2023-10-31", importoSpesa: 2900.0 },
  { id: 20, voceCosto: 4, descrizione: "Bolletta elettrica novembre 2023", dataSpesa: "2023-11-15", importoSpesa: 440.0 },
  // 2024
  { id: 21, voceCosto: 3, descrizione: "Stipendio personale gennaio 2024", dataSpesa: "2024-01-31", importoSpesa: 3000.0 },
  { id: 22, voceCosto: 4, descrizione: "Bolletta elettrica febbraio 2024", dataSpesa: "2024-02-15", importoSpesa: 450.0 },
  { id: 23, voceCosto: 1, descrizione: "Manutenzione preventiva", dataSpesa: "2024-03-20", importoSpesa: 350.0 },
  { id: 24, voceCosto: 2, descrizione: "Materiali di consumo", dataSpesa: "2024-04-05", importoSpesa: 250.0 },
  { id: 25, voceCosto: 3, descrizione: "Stipendio personale maggio 2024", dataSpesa: "2024-05-31", importoSpesa: 3000.0 },
  { id: 26, voceCosto: 4, descrizione: "Bolletta gas", dataSpesa: "2024-06-20", importoSpesa: 380.0 },
  { id: 27, voceCosto: 1, descrizione: "Riparazione impianto centrale", dataSpesa: "2024-07-10", importoSpesa: 500.0 },
  { id: 28, voceCosto: 2, descrizione: "Acquisto ricambi", dataSpesa: "2024-08-15", importoSpesa: 420.0 },
  { id: 29, voceCosto: 3, descrizione: "Stipendio personale settembre 2024", dataSpesa: "2024-09-30", importoSpesa: 3000.0 },
  { id: 30, voceCosto: 4, descrizione: "Bolletta elettrica ottobre 2024", dataSpesa: "2024-10-15", importoSpesa: 450.0 },
  // 2025
  { id: 31, voceCosto: 3, descrizione: "Stipendio personale gennaio 2025", dataSpesa: "2025-01-31", importoSpesa: 3100.0 },
  { id: 32, voceCosto: 4, descrizione: "Bolletta elettrica febbraio 2025", dataSpesa: "2025-02-15", importoSpesa: 470.0 },
  { id: 33, voceCosto: 1, descrizione: "Manutenzione programmata 2025", dataSpesa: "2025-03-10", importoSpesa: 480.0 },
];

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

// API functions for VoceCosto
export const voceCostoAPI = {
  getAll: () => [...vociCosto],
  getById: (id: number) => vociCosto.find((v) => v.id === id),
  create: (data: Omit<VoceCosto, "id">) => {
    const newItem: VoceCosto = {
      id: getNextId(vociCosto),
      ...data,
    };
    vociCosto.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<VoceCosto>) => {
    const index = vociCosto.findIndex((v) => v.id === id);
    if (index === -1) throw new Error("Not found");
    vociCosto[index] = { ...vociCosto[index], ...data };
    return vociCosto[index];
  },
  delete: (id: number) => {
    const index = vociCosto.findIndex((v) => v.id === id);
    if (index === -1) throw new Error("Not found");
    vociCosto.splice(index, 1);
  },
};

// API functions for Spesa
export const spesaAPI = {
  getAll: () => [...spese],
  getById: (id: number) => spese.find((s) => s.id === id),
  create: (data: Omit<Spesa, "id">) => {
    const newItem: Spesa = {
      id: getNextId(spese),
      ...data,
    };
    spese.push(newItem);
    return newItem;
  },
  update: (id: number, data: Partial<Spesa>) => {
    const index = spese.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Not found");
    spese[index] = { ...spese[index], ...data };
    return spese[index];
  },
  delete: (id: number) => {
    const index = spese.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Not found");
    spese.splice(index, 1);
  },
};

