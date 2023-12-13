import { Model } from "sequelize";
import DettagliOrdine from "../models/DettagliOrdine.js";
//interfaccia mediator per gestire il pattern mediator
interface Mediator {
    
    
    getAlimentiDaAlimentoController(ListaIdAlimentiOrdine: number[]):Promise<Model<any, any>[]>;
    aggiornaQuantitàRiservata(alimentiOrdine: DettagliOrdine[]):void;
    notifyCaricamento(idAlimento:number,quantità_caricata:number,quantità_richiesta:number):void;
    getCaricamentiFiltratiDaOrdineController(idAlimento: number, dataInizio: Date, dataFine: Date):Promise<Model<any, any>[]>;

     

}

export default Mediator;