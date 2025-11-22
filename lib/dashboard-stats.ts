import {
  contrattoAPI,
  scadenzaIncassoAPI,
  fatturaAPI,
  spesaAPI,
  voceCostoAPI,
} from "@/lib/mock-data";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";

export interface DashboardStats {
  totalScadenze: number;
  totalFatturati: number;
  totalPagati: number;
  totalSpeseEffettuate: number;
  contrattiPerMese: Array<{ month: string; count: number; importo: number }>;
  scadenzePerMese: Array<{ month: string; importo: number; pagato: number }>;
  fatturePerMese: Array<{ month: string; importo: number; pagato: number }>;
  spesePerMese: Array<{ month: string; importo: number }>;
  spesePerVoce: Array<{ voce: string; importo: number }>;
}

export function getDashboardStats(
  year: number,
  month?: number
): DashboardStats {
  const contratti = contrattoAPI.getAll();
  const scadenze = scadenzaIncassoAPI.getAll();
  const fatture = fatturaAPI.getAll();
  const spese = spesaAPI.getAll();

  // Filter by date range
  const startDate = month
    ? startOfMonth(new Date(year, month - 1, 1))
    : startOfMonth(new Date(year, 0, 1));
  const endDate = month
    ? endOfMonth(new Date(year, month - 1, 1))
    : endOfMonth(new Date(year, 11, 31));

  // Helper to check if date is in range
  const isInRange = (dateStr: string) => {
    const date = parseISO(dateStr);
    return date >= startDate && date <= endDate;
  };

  // Calculate totals
  const totalScadenze = scadenze
    .filter((s) => isInRange(s.dataScadenza))
    .reduce((sum, s) => sum + s.importoIncasso, 0);

  const totalFatturati = fatture
    .filter((f) => f.dataFattura && isInRange(f.dataFattura))
    .reduce((sum, f) => sum + f.importoFatturato + f.iva, 0);

  const totalPagati = fatture
    .filter(
      (f) => f.dataPagamento && f.dataPagamento && isInRange(f.dataPagamento)
    )
    .reduce((sum, f) => sum + f.importoFatturato + f.iva, 0);

  const totalSpeseEffettuate = spese
    .filter((s) => isInRange(s.dataSpesa))
    .reduce((sum, s) => sum + s.importoSpesa, 0);

  // Contratti per mese
  const contrattiPerMeseMap = new Map<string, { count: number; importo: number }>();
  contratti.forEach((c) => {
    const date = parseISO(c.dataInizio);
    const monthKey = format(date, "yyyy-MM");
    if (date.getFullYear() === year && (!month || date.getMonth() + 1 === month)) {
      const existing = contrattiPerMeseMap.get(monthKey) || { count: 0, importo: 0 };
      contrattiPerMeseMap.set(monthKey, {
        count: existing.count + 1,
        importo: existing.importo + c.importoContratto,
      });
    }
  });
  const contrattiPerMese = Array.from(contrattiPerMeseMap.entries())
    .map(([month, data]) => ({
      month: format(parseISO(`${month}-01`), "MMM yyyy"),
      ...data,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Scadenze per mese
  const scadenzePerMeseMap = new Map<
    string,
    { importo: number; pagato: number }
  >();
  scadenze.forEach((s) => {
    const date = parseISO(s.dataScadenza);
    const monthKey = format(date, "yyyy-MM");
    if (date.getFullYear() === year && (!month || date.getMonth() + 1 === month)) {
      const existing = scadenzePerMeseMap.get(monthKey) || {
        importo: 0,
        pagato: 0,
      };
      scadenzePerMeseMap.set(monthKey, {
        importo: existing.importo + s.importoIncasso,
        pagato: existing.pagato + (s.pagato ? s.importoIncasso : 0),
      });
    }
  });
  const scadenzePerMese = Array.from(scadenzePerMeseMap.entries())
    .map(([month, data]) => ({
      month: format(parseISO(`${month}-01`), "MMM yyyy"),
      ...data,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Fatture per mese
  const fatturePerMeseMap = new Map<
    string,
    { importo: number; pagato: number }
  >();
  fatture.forEach((f) => {
    if (f.dataFattura) {
      const date = parseISO(f.dataFattura);
      const monthKey = format(date, "yyyy-MM");
      if (date.getFullYear() === year && (!month || date.getMonth() + 1 === month)) {
        const existing = fatturePerMeseMap.get(monthKey) || {
          importo: 0,
          pagato: 0,
        };
        const totale = f.importoFatturato + f.iva;
        fatturePerMeseMap.set(monthKey, {
          importo: existing.importo + totale,
          pagato:
            existing.pagato +
            (f.dataPagamento && isInRange(f.dataPagamento) ? totale : 0),
        });
      }
    }
  });
  const fatturePerMese = Array.from(fatturePerMeseMap.entries())
    .map(([month, data]) => ({
      month: format(parseISO(`${month}-01`), "MMM yyyy"),
      ...data,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Spese per mese
  const spesePerMeseMap = new Map<string, number>();
  spese.forEach((s) => {
    const date = parseISO(s.dataSpesa);
    const monthKey = format(date, "yyyy-MM");
    if (date.getFullYear() === year && (!month || date.getMonth() + 1 === month)) {
      const existing = spesePerMeseMap.get(monthKey) || 0;
      spesePerMeseMap.set(monthKey, existing + s.importoSpesa);
    }
  });
  const spesePerMese = Array.from(spesePerMeseMap.entries())
    .map(([month, importo]) => ({
      month: format(parseISO(`${month}-01`), "MMM yyyy"),
      importo,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Spese per voce
  const spesePerVoceMap = new Map<string, number>();
  spese
    .filter((s) => {
      const date = parseISO(s.dataSpesa);
      return date.getFullYear() === year && (!month || date.getMonth() + 1 === month);
    })
    .forEach((s) => {
      const voce = voceCostoAPI.getById(s.voceCosto);
      const voceName = voce ? voce.descrizione : "Unknown";
      const existing = spesePerVoceMap.get(voceName) || 0;
      spesePerVoceMap.set(voceName, existing + s.importoSpesa);
    });
  const spesePerVoce = Array.from(spesePerVoceMap.entries())
    .map(([voce, importo]) => ({ voce, importo }))
    .sort((a, b) => b.importo - a.importo);

  return {
    totalScadenze,
    totalFatturati,
    totalPagati,
    totalSpeseEffettuate,
    contrattiPerMese,
    scadenzePerMese,
    fatturePerMese,
    spesePerMese,
    spesePerVoce,
  };
}

