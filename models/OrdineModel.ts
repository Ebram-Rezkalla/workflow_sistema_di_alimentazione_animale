import dettagliOrdine from "../db/dettagliOrdine.js";
import Ordine from "../db/ordine.js"
import DettagliOrdine from "./DettagliOrdine.js";
import StatoOrdine from "./StatoOrdine.js";

class OrdineModel{

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

    

}

export default OrdineModel;