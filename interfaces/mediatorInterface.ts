import { Model } from "sequelize";
import DettagliOrdine from "../models/DettagliOrdine.js";

interface Mediator {
    
    
    getAlimentiDaAlimentoController(ListaIdAlimentiOrdine: number[]):Promise<Model<any, any>[]>;
    aggiornaQuantitàRiservata(alimentiOrdine: DettagliOrdine[]):void;
    notifyCaricamento(idAlimento:number,quantità_caricata:number,quantità_richiesta:number):void;
        
     

}

export default Mediator;