import { Model } from "sequelize";

interface Mediator {
    notify(sender: object, event: string): void;
    
    verificaIdAlimenti(ListaIdAlimentiOrdine: number[]):Promise<Model<any, any>[]>;
        
        
     

}

export default Mediator;