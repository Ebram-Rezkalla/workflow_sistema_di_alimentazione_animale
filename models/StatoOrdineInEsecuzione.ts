import { CustomErrorTypes, errorFactory } from "error-handler-module";
import OrdineState from "../interfaces/ordineState.js";
import OrdineModel from "./OrdineModel.js";
import { StatusCodes } from "http-status-codes";
import StatoOrdine from "./StatoOrdine.js";
import { Model } from "sequelize";

//classe che gestisce la classe OrdineModel quanto lo stato è IN ESECUZIONE

class StatoOrdineInEsecuzione implements OrdineState {
  constructor(private context: OrdineModel) {}

  presaInCarico() {
    const messaggio= 'StatoOrdineInEsecuzione: Impossibile prendere in carico un ordine già in esecuzione.'
    console.log(messaggio);
    return errorFactory(CustomErrorTypes.BAD_REQUEST)(messaggio)
  }

  async controlloAlimento(idAlimento: number) {
    const alimentoOrdine= await this.context.getAlimentoOrdine(idAlimento)
      console.log(alimentoOrdine)
      if(alimentoOrdine) 
          return alimentoOrdine
      else{
      const messaggio= "L'alimento non è presente in questo ordine"
      return  messaggio
    }
  
  }

  aggiornaStatoOrdineToFallito(){
    this.context.aggiornaStatoOrdineToDb(this.context.id,StatoOrdine.Fallito )
    this.context.transizione(StatoOrdine.Fallito);
  }

  aggiornaStatoOrdineCompletato(){
    this.context.aggiornaStatoOrdineToDb(this.context.id,StatoOrdine.Completato )
    this.context.transizione(StatoOrdine.Completato);
    const messaggio= "Ordine completato con successo."
    return messaggio

  }
  
  async getStatoOrdine(){
    const caricamenti=await this.context.getCaricamentiOrdine()

      const statoOrdine: { Stato: string,Operazioni_di_Carico: string |Model<any,any>[] } = {
        Stato: StatoOrdine.InEsecuzione,
        Operazioni_di_Carico: caricamenti.length!==0 ? caricamenti:"Non sono state effettuate ancora operazioni di carico"
      };

      
      return statoOrdine
    
  }

}

  export default StatoOrdineInEsecuzione;