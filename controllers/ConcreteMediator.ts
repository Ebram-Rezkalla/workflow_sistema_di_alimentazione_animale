import { Model } from "sequelize";
import Alimento from "../db/alimento";
import Mediator from "../interfaces/mediatorInterface";
import DettagliOrdine from "../models/DettagliOrdine";
import AlimentoController from "./AlimentoController";
import OrdineController from "./OrdineController";

class ConcreteMediator implements Mediator {
    private alimentoController:  AlimentoController;

    private ordineController: OrdineController;

    constructor(alimentoController: AlimentoController, ordineController: OrdineController) {
        
        this.alimentoController = alimentoController;
        this.alimentoController.setMediator(this);
        this.ordineController = ordineController;
        this.ordineController.setMediator(this);
    }

    public notify(sender: object, event: string): void {
       /* if (event === 'A') {
            console.log('Mediator reacts on A and triggers following operations:');
            this.component2.doC();
        }

        if (event === 'D') {
            console.log('Mediator reacts on D and triggers following operations:');
            this.component1.doB();
            this.component2.doC();
        }*/
    }
        //metodo che verifica se gli id ricevuti dal cliente sono validi
    public async verificaIdAlimenti(ListaIdAlimentiOrdine: number[]):Promise<Model<any, any>[]> {
        
        return this.alimentoController.verificaAlimentiDiUnOrdine(ListaIdAlimentiOrdine)
     }
}

export default ConcreteMediator;