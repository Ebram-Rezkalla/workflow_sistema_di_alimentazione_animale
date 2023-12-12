import { Mode } from "node:fs";
import dettagliOrdine from "../db/dettagliOrdine.js";
import Ordine from "../db/ordine.js"
import DettagliOrdine from "./DettagliOrdine.js";
import StatoOrdine from "./StatoOrdine.js";
import { Model, where } from "sequelize";
import OrdineState from "../interfaces/ordineState.js";
import StatoOrdineCreato from "./StatoOrdineCreato.js";
import StatoOrdineInEsecuzione from "./StatoOrdineInEsecuzione.js";
import PresaInCarico from "../db/presaInCarico.js";
import StatoOrdineCompletato from "./StatoOrdineCompletato.js";
import StatoOrdineFallito from "./StatoOrdineFallito.js";
import Caricamento from "../db/caricamento.js";
class OrdineModel{
    public   id!: number //id ordine 
    private stato!: OrdineState; //stato ordine 
// metodo per gestire l'aggiornamento dello stato dell'ordine 
    transizione(nuovoStato: StatoOrdine): void {
        switch (nuovoStato) {
        case StatoOrdine.Creato:
            this.stato = new StatoOrdineCreato(this);
            break;
        case StatoOrdine.InEsecuzione:
            this.stato = new StatoOrdineInEsecuzione(this);
            break;
        case StatoOrdine.Completato:
            this.stato = new StatoOrdineCompletato(this);
            break;
        case StatoOrdine.Fallito:
            this.stato = new StatoOrdineFallito(this);
            break;
        default:
            throw new Error('Stato non gestito.');
        }
    }
    //metodo che inizializza l'id e lo stato della classe ricavando i dati dal db
    async inizializzaStato(id:number) {
         const ordine= await this.getOrdineById(id)
            if (ordine) {
                this.id= id
                this.transizione(ordine.dataValues.stato);
            }
            return ordine
    }

    //metodo per gestire la presa in carico tramite lo stato attuale dell'ordine
    presaInCarico()  {
        return this.stato.presaInCarico();
      }
        //metodo che controlla la presenza di un alimento nell'ordine tramite lo stato attuale dello stesso
    controlloAlimento(idAlimento: number) {
        return this.stato.controlloAlimento(idAlimento);
      }
        //metodo che aggiorna lo stato dell'ordine a FALLITO
    aggiornaStatoOrdineToFallito(){

        return this.stato.aggiornaStatoOrdineToFallito();
    }
        //metodo che aggiorna lo stato dell'ordine a COMPLETATO
    aggiornaStatoOrdineCompletato(){

        return this.stato.aggiornaStatoOrdineCompletato();
    }
    
    getStatoOrdine(){
        return this.stato.getStatoOrdine()
    }

    

    async addOrdine(alimentiOrdine:DettagliOrdine[]){
        //creo l'ordine e lo salvo in db con Create
        const newordine=await Ordine.create({
            data_creazione: new Date()
        });
        alimentiOrdine.forEach(async alimento => {
            await dettagliOrdine.create({
                OrdineId: newordine.dataValues.id,
    
                AlimentoId: alimento.idAlimento,
    
                quantità_richiesta: alimento.quantità_richiesta,
    
                sequenza: alimento.sequenza,

            })
        });
       const newdettagliOrdine= await dettagliOrdine.findAll({
        where:{
            OrdineId: newordine.dataValues.id
        }
       })

        return newdettagliOrdine
    }


    async getOrdineById(id:number){

        const ordine= await Ordine.findByPk(id)
        return ordine
    }

    async aggiornaStatoOrdineToDb( id: number,newStato: StatoOrdine){

        await Ordine.update({stato: newStato}, {
            where: {
              id: id
            }
          })
    }

    async addPresaInCarico(){
        await PresaInCarico.create({
            OrdineId : this.id,
            data_preaInCarico: new Date()
        })

    }

    async getAlimentoOrdine(idAlimento: number){
        const alimentoOrdine = await dettagliOrdine.findOne({
            where: {
                OrdineId: this.id,
                AlimentoId: idAlimento
            }
        });
        return alimentoOrdine
    }

    async getAlimentiOrdine(){
        const alimentiOrdine = await dettagliOrdine.findAll({
            where: {
                OrdineId: this.id,
            }
        });
        return alimentiOrdine
    }

    async getAlimentiOrdineDaLiberare(){
        const alimentiOrdine = await dettagliOrdine.findAll({
            where: {
                OrdineId: this.id,
                caricato: false
            }
        });
        return alimentiOrdine
    }

    async changeToCaricatoStatoAlimento(idAlimento: number){
        await dettagliOrdine.update({ caricato: true },{
            where: {
                OrdineId: this.id,
                AlimentoId: idAlimento
            }
        });
    }

    async getAlimentoOrdineConSequenza( sequenza: number){
        const alimentoOrdine = await dettagliOrdine.findOne({
                    where: {
                        OrdineId: this.id,
                        sequenza: sequenza
                    }
                });
                return alimentoOrdine
        
            }

    async addOperazioneCaricamento(idAlimento: number,quantità_caricata:number)  {
        const caricamento= await Caricamento.create({
            OrdineId: this.id,
            AlimentoId: idAlimento,
            quantità_caricata:quantità_caricata,
            data_caricamento: new Date()

        }) 
        return caricamento
    }
    
    
    async getCaricamentiOrdine() {
        const caricamenti = await Caricamento.findAll({
            where: {
                OrdineId: this.id
            },
            attributes: {
                exclude: ['OrdineId']
            }
        });
    
        return caricamenti;
    }
    
}

export default OrdineModel;