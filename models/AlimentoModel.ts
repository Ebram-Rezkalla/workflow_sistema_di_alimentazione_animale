import { todo } from "node:test";
import Alimento from "../db/alimento.js";

//modello di alimento che mi permette ad interfacciare con il db
class AlimentoModel {
    //metofd per la creazione di un nuovo alimento
    async addAlimento(nome:string,dis: number){
        //creo l'alimento e lo salvo al db con Create
        const newalimento=await Alimento.create({
            nome: nome,
            disponibilità: dis
        })
        return newalimento
    }
    //metodo modifica alimento  
    async modificaAlimento(id:number,nomeNuovo: string){
        //creo l'alimento e lo salvo al db con Create
        const rowModificato=await Alimento.update({ nome: nomeNuovo }, {
            where: {
              id: id
            }
          })

        return rowModificato
    }

    async getALimentoById(id:number){

        const alimentoId= await Alimento.findByPk(id)
    }

    /*async getAlimenti(){
        return await Alimento.findAll()
  }*/
  
}
  export default AlimentoModel;