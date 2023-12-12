import { CustomErrorTypes, errorFactory } from "error-handler-module";
import OrdineState from "../interfaces/ordineState.js";
import OrdineModel from "./OrdineModel.js";
import StatoOrdine from "./StatoOrdine.js";
//classe che gestisce la classe OrdineModel quanto lo stato è CREATO

class StatoOrdineCreato implements OrdineState {
    constructor(private context: OrdineModel) {}
  
    presaInCarico() {
      console.log('StatoOrdineCreato: Ordine preso in carico.');
       this.context.addPresaInCarico()
      this.context.aggiornaStatoOrdineToDb(this.context.id,StatoOrdine.InEsecuzione )
      this.context.transizione(StatoOrdine.InEsecuzione);
      const messaggio : string = "l'ordine è stato preso in carico, il nuovo stato dell'ordine è "+ StatoOrdine.InEsecuzione
    
        return messaggio
    }
  
    controlloAlimento() {
        const messaggio= "StatoOrdineCreato: L'ordine non è stato ancora preso in carico di conseguenza non si possono accettare caricamenti "
        return messaggio
    }
    aggiornaStatoOrdineToFallito(){
        this.context.aggiornaStatoOrdineToDb(this.context.id,StatoOrdine.Fallito )
      this.context.transizione(StatoOrdine.Fallito);
    }
    aggiornaStatoOrdineCompletato(){
      const messaggio= "StatoOrdineCreato: L'ordine non può passare allo stato Completato in quanto non è stato ancora preso in carico ne è stato effettuato alcun caricamento di alimenti "
      console.log(messaggio);
      return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)

    }

    getStatoOrdine(){

      const statoOrdine: { Stato: string } = {
        Stato: StatoOrdine.Creato,
      };
      
      return statoOrdine

    }
  }

  export default StatoOrdineCreato;