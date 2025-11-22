# react_crud
react_crud
PROJECT: Gestionale for private client

MILESTONE 1:Create a mockup applicaition UIX 

FRONTEND
1. React
2. Next.js
3. Zod Form Validation and react form hook
4. react admin component
5. ui.shadcn.com
6. react-flow
8. Autocompelte all select
9. one2many table edit in line easy

THIS is the ERD od DATA:
Table ClienteTipo {
  id varchar [primary key]
  descrizione varchar
}
Table TipoPagamento {
  id varchar [primary key]
  descrizione varchar
}
Table TipoFatturazione {
  id varchar [primary key]
  descrizione varchar
  mesi integer
}
Table Cliente {
  id integer [primary key]
  cliente_tipo ClienteTipo
  denominazione varchar
  cognome varchar
  nome varchar
  indirizzo varchar
}
Table Impianto {
  id integer [primary key]
  codice varchar
  denominazione varchar
  indirizzo varchar
  libero boolean
}
Table Contratto {
  id integer [primary key]
  cliente Cliente 
  impianto Impianto
  durataMese integer
  dataInizio date 
  dataFine date 
  rinnovabile boolean
  tipoPagamento TipoPagamento
  tipoFatturazione TipoFatturazione
  importoContratto  double
}
Table ScadenzaIncasso {
  id integer [primary key]
  contratto Contratto
  dataScadenza date 
  importoIncasso double
  tipoPagamento TipoPagamento
  pagato boolean
}
Table Fattura {
  id integer [primary key]
  scadenzaIncasso ScadenzaIncasso
  contratto Contratto
  note text
  dataFattura  date
  dataPagamento date
  tipoPagamento TipoPagamento
  importoFatturato  double
  iva  double
}
Ref: "Cliente"."cliente_tipo" > "ClienteTipo"."id"
Ref: "Contratto"."cliente" > "Cliente"."id"
Ref: "Contratto"."impianto" > "Impianto"."id"
Ref: "Contratto"."tipoPagamento" > "TipoPagamento"."id"
Ref: "Contratto"."tipoFatturazione" > "TipoFatturazione"."id"
Ref: "ScadenzaIncasso"."contratto" > "Contratto"."id"
Ref: "ScadenzaIncasso"."tipoPagamento" > "TipoPagamento"."id"
Ref: "Fattura"."tipoPagamento" > "TipoPagamento"."id"
Ref: "Fattura"."scadenzaIncasso" > "ScadenzaIncasso"."id"
Ref: "Fattura"."contratto" > "Contratto"."id"

1. Create a crud all tables
2. Create the  Contratto crud with possibility to edit:
3. Inline datatable edit  List<ScadenzaIncasso>
4. Inline datatable edit  List<Fattura>
5. Use Autocomplete component(like select2) to handler Ref one  
6. Full-text search: searches across all text columns simultaneously
7. Column filter: dropdown with unique values from selected column


  



