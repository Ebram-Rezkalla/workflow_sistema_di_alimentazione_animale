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
        const nuovaDis = alimento.dataValues.disponibilità + quantità //faccio la somma della quantità aggiunta e la disponibilità attuale
       await this.addOperazioneScaricamento(alimento.dataValues.id,quantità).then(()=>{
            this.aggiornaDisponibilitàAlimento(alimento.dataValues.id,nuovaDis)
        })
       
    
        return nuovaDis
             
        
    }
    //metodo per creare un nuovo scaricamento
    async addOperazioneScaricamento(id: number,quantità: number){
        const scaricamento=await Scaricamento.create({
            id_alimento: id,
            quantità_scaricata: quantità
        })
        return scaricamento

    }

    async aggiornaDisponibilitàAlimento(id:number,nuovaDis: number){
        //chaimo metodo update passando la chiave id dell'alimento
        await Alimento.update({ disponibilità: nuovaDis }, {
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
    async verificaIdAlimentiDiUnOrdine (listIdAlimentiOrdine: number[]):Promise<Model<any, any>[]>{
        
        return await Alimento.findAll({
            where:{
                id: listIdAlimentiOrdine
            }
        }
        );
    }

    /*async getAlimenti(){
        return await Alimento.findAll()
  }*/
  
}
  export default AlimentoModel;