import Ordine from "../db/ordine"
import StatoOrdine from "./StatoOrdine.js";

class OrdineModel{

    async addOrdine(stato:StatoOrdine){
        //creo l'alimento e lo salvo in db con Create
        const newordine=await Ordine.create({
            stato: stato,
            
        })
        return newordine
    }


}

export default Ordine;