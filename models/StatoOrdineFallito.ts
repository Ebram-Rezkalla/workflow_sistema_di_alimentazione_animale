import { CustomErrorTypes, errorFactory } from "error-handler-module";
import OrdineState from "../interfaces/ordineState.js";
import OrdineModel from "./OrdineModel.js";
import StatoOrdine from "./StatoOrdine.js";
//classe che gestisce la classe OrdineModel quanto lo stato è FALLITO

class StatoOrdineFallito implements OrdineState {
    constructor(private context: OrdineModel) {}
  
    presaInCarico() {
      const messaggio= 'StatoOrdineFallito: Impossibile prendere in carico un ordine già Fallito.'
      console.log(messaggio);
      return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)
    }
  
    controlloAlimento() {
      const messaggio= "StatoOrdineFallito: L'ordine è fallito perciò non si può eseguire nessuna operazione di caricamento "
        return messaggio
    }

    aggiornaStatoOrdineToFallito(){
      const messaggio= "StatoOrdineFallito: L'ordine era già in stato fallito"
        console.log(messaggio);
        return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)
    }

    aggiornaStatoOrdineCompletato(){
      const messaggio= "StatoOrdineFallito: L'ordine non può passare allo stato Completato"
      console.log(messaggio);
      return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)

    }
  }

  export default StatoOrdineFallito;