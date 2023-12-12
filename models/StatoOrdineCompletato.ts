import { CustomErrorTypes, errorFactory } from "error-handler-module";
import OrdineState from "../interfaces/ordineState.js";
import OrdineModel from "./OrdineModel.js";
import StatoOrdine from "./StatoOrdine.js";
import { Model } from "sequelize";
import { formatDistance } from "date-fns";
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
      //metodo per ottenere lo stato dell'ordine con le operazionii carico, lo scostamento e il tempo complessivo di carico
    async getStatoOrdine(){
      const caricamenti = await this.context.getCaricamentiOrdine()
      const alimentiOrdine= await this.context.getAlimentiOrdine()
      
      const operazioniConScostamento = this.calcoloScostamento(caricamenti,alimentiOrdine)//calcolo lo scostamento
       const tempoComplessivoDiCarico = this.calcoloTempoComplessivoCarico(caricamenti,alimentiOrdine)//calcolo il tempo complessivo
      //creo un oggetto per mettere tutto insieme
      const statoOrdine: { Stato: string,Operazioni_di_Carico:{AlimentoId: any;quantità_caricata: any;data_caricamento: any;quantità_richiesta: any;scostamento_tra_richiesto_caricato: number;}[],Tempo_complessivo_di_carico:string } 
        = {
          Stato: StatoOrdine.Completato,
          Tempo_complessivo_di_carico:tempoComplessivoDiCarico,
          Operazioni_di_Carico: operazioniConScostamento,
        };

        return statoOrdine
       
    }


    calcoloScostamento(caricamenti: Model<any, any>[], alimentiOrdine:Model<any, any>[]){

      const operazioniConScostamento = alimentiOrdine.map(alimentoOrdine => {
        const corrispondenzaCaricamento = caricamenti.find(caricamento => caricamento.dataValues.AlimentoId === alimentoOrdine.dataValues.AlimentoId);
    
        const quantitàRichiesta = alimentoOrdine.dataValues.quantità_richiesta;
        const quantitàCaricata = corrispondenzaCaricamento ? corrispondenzaCaricamento.dataValues.quantità_caricata : 0;
        const dataCaricamento = corrispondenzaCaricamento ? corrispondenzaCaricamento.dataValues.data_caricamento : null;
        const scostamentoTraRichiestoCaricato = quantitàRichiesta -quantitàCaricata;
        const scostamentoArrotondato = Number(scostamentoTraRichiestoCaricato.toFixed(3)); // Arrotondo a tre decimali

        return {
            AlimentoId: alimentoOrdine.dataValues.AlimentoId,
            quantità_caricata: quantitàCaricata,
            data_caricamento: dataCaricamento,
            quantità_richiesta: quantitàRichiesta,
            scostamento_tra_richiesto_caricato: scostamentoArrotondato
        };
      });

      return operazioniConScostamento

    }

    calcoloTempoComplessivoCarico(caricamenti: Model<any, any>[],alimentiOrdine:Model<any, any>[]):string{

      const dateCaricamento = caricamenti.map(caricamento => new Date(caricamento.dataValues.data_caricamento));
      const { dataPiùVecchia, dataPiùRecente } = dateCaricamento.reduce((accumulator, currentDate) => {
        if (currentDate < accumulator.dataPiùVecchia) {
            accumulator.dataPiùVecchia = currentDate;
        }
        if (currentDate > accumulator.dataPiùRecente) {
            accumulator.dataPiùRecente = currentDate;
        }
        return accumulator;
    }, { dataPiùVecchia: dateCaricamento[0], dataPiùRecente: dateCaricamento[0] });
        console.log(dataPiùVecchia)
        console.log(dataPiùRecente)
              
        const tempoComplessivoDiCarico =dataPiùRecente.getTime()- dataPiùVecchia.getTime()

        //const risultato = formatDistance(new Date(0), tempoComplessivoDiCarico, { addSuffix: false });

      return this.convertiTempo(tempoComplessivoDiCarico)
    }

    convertiTempo(millisecondi: number): string {
      const secondi = Math.floor(millisecondi / 1000);
      const minuti = Math.floor(secondi / 60);
      const ore = Math.floor(minuti / 60);
      const giorni = Math.floor(ore / 24);
  
      const restoOre = ore % 24;
      const restoMinuti = minuti % 60;
      const restoSecondi = secondi % 60;
  
      let risultato = '';
  
      if (giorni > 0) {
          risultato += `${giorni} giorni, `;
      }
  
      if (restoOre > 0) {
          risultato += `${restoOre} ore, `;
      }
  
      if (restoMinuti > 0) {
          risultato += `${restoMinuti} minuti, `;
      }
  
      if (restoSecondi > 0) {
          risultato += `${restoSecondi} secondi`;
      }
  
      risultato = risultato.replace(/,\s*$/, '');
  
      return risultato;
  }
  
}

  export default StatoOrdineCompletato;