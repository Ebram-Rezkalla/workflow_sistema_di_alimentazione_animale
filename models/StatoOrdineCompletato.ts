import { CustomErrorTypes, errorFactory } from "error-handler-module";
import OrdineState from "../interfaces/ordineState.js";
import OrdineModel from "./OrdineModel.js";
import StatoOrdine from "./StatoOrdine.js";
//classe che gestisce la classe OrdineModel quanto lo stato è COMPLETATO
class StatoOrdineCompletato implements OrdineState {
    constructor(private context: OrdineModel) {}
  
    presaInCarico() {
      const messaggio= 'StatoOrdineCompletato: Impossibile prendere in carico un ordine già Completato.'
      console.log(messaggio);
      return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)
    }
  
    controlloAlimento() {
      const messaggio= "StatoOrdineCompletato: tutti gli alimenti presenti nell'ordine sono stati caricati "
        return messaggio
    }

    aggiornaStatoOrdineToFallito(){
      const messaggio= "StatoOrdineCompletato: L'ordine è stato già completato, non si può cambiare il suo stato "
        console.log(messaggio);
        return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)
    }

    aggiornaStatoOrdineCompletato(){
      const messaggio= "StatoOrdineCompletato: L'ordine era già in stato completato "
      console.log(messaggio);
      return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)

    }
}

  export default StatoOrdineCompletato;