import { todo } from "node:test";
import Alimento from "../db/alimento.js";
import Scaricamento from "../db/scaricamento.js";
import { Model, Op } from "sequelize";
import DettagliOrdine from "./DettagliOrdine.js";

//modello di alimento che mi permette ad interfacciare con il db
class AlimentoModel {
    
    //metodo per la creazione di un nuovo alimento
    async addAlimento(nome:string,dis: number){
        //creo l'alimento e lo salvo in db con Create
        const newalimento=await Alimento.create({
            nome: nome,
            disponibilità: dis
        })
        return newalimento
    }
    //metodo modifica alimento  
    async modificaAlimento(id:number,nomeNuovo: string){
        //chaimo metodo update passando la chiave id dell'alimento
        const rowModificato=await Alimento.update({ nome: nomeNuovo }, {
            where: {
              id: id
            }
          })

        return rowModificato
    }

    // metodo per scaricare un alimento e aggirnare la sua disponibilità
    async scaricaAlimento(alimento: Model<any, any>,quantità: number){
       await this.addOperazioneScaricamento(alimento.dataValues.id,quantità)
       await this.aggiornaDisponibilitàAlimento(alimento.dataValues.id,quantità)
       
        return await this.getALimentoById(alimento.dataValues.id)
             
        
    }
    //metodo per creare un nuovo scaricamento
    async addOperazioneScaricamento(id: number,quantità: number){
        const scaricamento=await Scaricamento.create({
            id_alimento: id,
            quantità_scaricata: quantità,
            data: new Date()
        })
        return scaricamento

    }
    //metodo che aggiorna la disponibilità di un alimento
    async aggiornaDisponibilitàAlimento(id:number,nuovaDis: number){
        //chaimo metodo update passando la chiave id dell'alimento
        await Alimento.increment({ disponibilità: nuovaDis }, {
            where: {
              id: id
            }
          })

    }
    
    async getALimentoById(id:number){

        const alimento= await Alimento.findByPk(id)
        return alimento
    }
    //metodo che recupera una lista di id passati
    async getAlimenti (listIdAlimentiOrdine: number[]):Promise<Model<any, any>[]>{
        
        return await Alimento.findAll({
            where:{
                id: listIdAlimentiOrdine
            }
        }
        );
    }
        //metodo che aggiorna la quantità riservata di ogni alimento contenuto in un ordine all'atto della sua creazione 
    async aggiornaQuantitàRiservata(alimentiOrdine: DettagliOrdine[]): Promise<void> {
        alimentiOrdine.map(async alimento => {
            await Alimento.increment(
                'quantità_riservata',
                { by: alimento.quantità_richiesta, where: { id: alimento.idAlimento } }
            );
        });
        
    }
    //metodo che aggiorna sia la disponibilità che la quantità riservata di un alimento
    async aggiornaQuantitàRiservataAndDisponibilità(id: number, quantità_caricata:number,quantità_richiesta:number) {
        // Chiamo il metodo update passando la chiave id dell'alimento
        await Alimento.increment(
            {
                disponibilità: quantità_caricata,
                quantità_riservata: quantità_richiesta
            },
            {
                where: {
                    id: id
                }
            }
        );

    }
        
        
}
  export default AlimentoModel;