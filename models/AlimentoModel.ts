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

    /*async getAlimenti(){
        return await Alimento.findAll()
  }*/
  
}
  export default AlimentoModel;