import StatoOrdine from "../models/StatoOrdine";
//interfaccia OrdineState per gestire il pattern State
interface OrdineState {
    presaInCarico(): any;
    controlloAlimento(idAlimento: number): any;
    aggiornaStatoOrdineToFallito():any;

    aggiornaStatoOrdineCompletato():any;
    getStatoOrdine():any
  }

  export default OrdineState;