import { Model } from "sequelize";
import DettagliOrdine from "../models/DettagliOrdine.js";

interface Mediator {
    notify(sender: object, event: string): void;
    
    getAlimentiDaAlimentoController(ListaIdAlimentiOrdine: number[]):Promise<Model<any, any>[]>;
    aggiornaQuantitàRiservata(alimentiOrdine: DettagliOrdine[]):void;

        
     

}

export default Mediator;