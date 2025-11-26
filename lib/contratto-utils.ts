import { addMonths, format, parseISO } from "date-fns";
import type { Contratto, ScadenzaIncasso, TipoFatturazione } from "@/types";
import { tipoFatturazioneAPI } from "@/lib/mock-data";

/**
 * Calculate the end date based on start date and duration in months
 */
export function calculateDataFine(
  dataInizio: string,
  durataMese: number
): string {
  const startDate = parseISO(dataInizio);
  const endDate = addMonths(startDate, durataMese);
  // Subtract one day to get the last day of the contract
  const finalDate = addMonths(startDate, durataMese - 1);
  const lastDay = new Date(finalDate.getFullYear(), finalDate.getMonth() + 1, 0);
  return format(lastDay, "yyyy-MM-dd");
}

/**
 * Generate automatic ScadenzaIncasso list based on contract data
 */
export function generateScadenzeIncasso(
  contratto: Contratto
): Omit<ScadenzaIncasso, "id">[] {
  const tipoFatturazione = tipoFatturazioneAPI.getById(contratto.tipoFatturazione);
  
  if (!tipoFatturazione) {
    return [];
  }

  const dataInizio = parseISO(contratto.dataInizio);
  const frequenzaMesi = tipoFatturazione.mesi;
  const durataMese = contratto.durataMese;
  
  // Calculate how many installments we need
  const numScadenze = Math.ceil(durataMese / frequenzaMesi);
  
  // Calculate importo per scadenza
  const importoPerScadenza = contratto.importoContratto / numScadenze;
  
  const scadenze: Omit<ScadenzaIncasso, "id">[] = [];
  
  for (let i = 0; i < numScadenze; i++) {
    const mesiDaAggiungere = (i + 1) * frequenzaMesi;
    let dataScadenza = addMonths(dataInizio, mesiDaAggiungere - 1);
    
    // Get the last day of the month for the scadenza
    const lastDayOfMonth = new Date(
      dataScadenza.getFullYear(),
      dataScadenza.getMonth() + 1,
      0
    );
    
    // If this is the last scadenza, use the contract end date
    if (i === numScadenze - 1) {
      const contractEndDate = parseISO(contratto.dataFine);
      if (lastDayOfMonth > contractEndDate) {
        dataScadenza = contractEndDate;
      } else {
        dataScadenza = lastDayOfMonth;
      }
    } else {
      dataScadenza = lastDayOfMonth;
    }
    
    scadenze.push({
      contratto: contratto.id,
      dataScadenza: format(dataScadenza, "yyyy-MM-dd"),
      importoIncasso: Math.round(importoPerScadenza * 100) / 100, // Round to 2 decimals
      tipoPagamento: contratto.tipoPagamento,
      pagato: false,
    });
  }
  
  // Adjust the last scadenza to account for rounding differences
  if (scadenze.length > 0) {
    const totalCalcolato = scadenze.reduce(
      (sum, s) => sum + s.importoIncasso,
      0
    );
    const differenza = contratto.importoContratto - totalCalcolato;
    if (Math.abs(differenza) > 0.01) {
      // Add the difference to the last scadenza
      scadenze[scadenze.length - 1].importoIncasso += differenza;
      scadenze[scadenze.length - 1].importoIncasso =
        Math.round(scadenze[scadenze.length - 1].importoIncasso * 100) / 100;
    }
  }
  
  return scadenze;
}


