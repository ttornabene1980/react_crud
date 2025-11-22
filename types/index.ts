// Database types based on ERD

export interface ClienteTipo {
  id: string;
  descrizione: string;
}

export interface TipoPagamento {
  id: string;
  descrizione: string;
}

export interface TipoFatturazione {
  id: string;
  descrizione: string;
  mesi: number;
}

export interface Cliente {
  id: number;
  cliente_tipo: string; // FK to ClienteTipo.id
  denominazione: string;
  cognome: string;
  nome: string;
  indirizzo: string;
}

export interface Impianto {
  id: number;
  codice: string;
  denominazione: string;
  indirizzo: string;
  libero: boolean;
}

export interface Contratto {
  id: number;
  cliente: number; // FK to Cliente.id
  impianto: number; // FK to Impianto.id
  durataMese: number;
  dataInizio: string; // date as string
  dataFine: string; // date as string
  rinnovabile: boolean;
  tipoPagamento: string; // FK to TipoPagamento.id
  tipoFatturazione: string; // FK to TipoFatturazione.id
  importoContratto: number;
}

export interface ScadenzaIncasso {
  id: number;
  contratto: number; // FK to Contratto.id
  dataScadenza: string; // date as string
  importoIncasso: number;
  tipoPagamento: string; // FK to TipoPagamento.id
  pagato: boolean;
}

export interface Fattura {
  id: number;
  scadenzaIncasso: number | null; // FK to ScadenzaIncasso.id (nullable)
  contratto: number; // FK to Contratto.id
  note: string;
  dataFattura: string; // date as string
  dataPagamento: string | null; // date as string (nullable)
  tipoPagamento: string; // FK to TipoPagamento.id
  importoFatturato: number;
  iva: number;
}

