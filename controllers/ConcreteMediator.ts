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
        this.alimentoController.setMediator(this);//setto il mediatore del contollore
        this.ordineController = ordineController;
        this.ordineController.setMediator(this);//setto il mediatore del contollore
    }

    
        //metodo recupera gli alimenti 
    public async getAlimentiDaAlimentoController(ListaIdAlimentiOrdine: number[]):Promise<Model<any, any>[]> {
        
        return this.alimentoController.getAlimenti(ListaIdAlimentiOrdine)
    }

        //metodo che aggiorna la quantità riservata di una lista di alimenti
     public aggiornaQuantitàRiservata(alimentiOrdine: DettagliOrdine[]):void{

        this.alimentoController.aggiornaQuantitàRiservata(alimentiOrdine);
    }

     //metodo che notifica il caricamento di un alimento al classe AlimentoController
     public notifyCaricamento(idAlimento:number,quantità_caricata:number,quantità_richiesta:number ):void{
        this.alimentoController.aggiornaQuantitàRiservataAndDisponibilità(idAlimento,quantità_caricata,quantità_richiesta)
    }

     public getCaricamentiFiltratiDaOrdineController(idAlimento: number, dataInizio: Date, dataFine: Date):Promise<Model<any, any>[]>{

         return this.ordineController.getCaricamentiAlimentoFiltratiByData(idAlimento,dataInizio,dataFine)

    }


}

export default ConcreteMediator;