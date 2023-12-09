import { NextFunction, Response,Request,ErrorRequestHandler, Router } from 'express';
import Controller from "../interfaces/controllerInterface.js";
import AlimentoModel from "../models/AlimentoModel.js";
import verifyAndAuthenticate from '../auth/autenticazione.js';
import checkHeader from '../auth/checkHeader.js';
import alimentoSchema from '../validation/alimentoSchema.js';
import { Validator } from 'express-json-validator-middleware';
import { StatusCodes } from 'http-status-codes';
import modificaAlimentoSchema from '../validation/modificaAlimentoSchema.js';
import { CustomError, CustomErrorTypes, errorFactory } from 'error-handler-module';
import { json } from 'sequelize';
import errorValidationHandler from '../validation/errorValidationHandler.js';
import scaricoSchema from '../validation/scaricoSchema.js';
import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ordineSchema from '../validation/ordineSchema.js';
import { todo } from 'node:test';
import BaseController from './BaseController.js';


//classe per il controllo degli ordini
class OrdineController extends BaseController implements Controller {
    public path = '/ordini';
    public router = Router();
   // private ordine = new OrdineModel; //creo un istanza del modello ordine
    private validator =new Validator({allErrors: true});// Without allErrors: true, ajv will only return the first error

    constructor() {
       
        super();
      this.initializeRoutes();// inizializzo le rotte

    }
  
    private initializeRoutes() {
      
      this.router.post(`${this.path}/crea`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:ordineSchema}),
      errorValidationHandler,this.controlloAlimentiDuplicati,this.controlloSequenza,this.controlloIdAlimenti,this.creaOrdine);//rotta creazione ordine
      
    
    }

    //metodo per creare un nuovo ordine 
    /*private creaOrdine=async (req: Request, res: Response,next :NextFunction) =>{
        const listaIdAlimentiOrdine: number [] =  req.body.map((alimento: { idAlimento: number; })=>alimento.idAlimento)//salvo tutti gli id in un array
        this.mediator.verificaIdAlimenti(listaIdAlimentiOrdine).then((listaAlimenti){})
        
    }*/

    private creaOrdine = async (req: Request, res: Response, next: NextFunction) => {
        const listaIdAlimentiOrdine: number[] = req.body.map((alimento: { idAlimento: number; }) => alimento.idAlimento);

            const listaAlimenti = await this.mediator.verificaIdAlimenti(listaIdAlimentiOrdine);
    
            // Trova gli ID che non esistono in listaAlimenti
            const idMancanti = listaIdAlimentiOrdine.filter(id => !listaAlimenti.map(alimento => alimento.dataValues.id).includes(id));
    
            if (idMancanti.length > 0) {
                // Gestisci gli ID mancanti
                console.log('ID mancanti:', idMancanti);
            } else {
                // Tutti gli ID sono validi
                console.log('Tutti gli ID sono validi');
            }
    
        
    };
    

        //metodo per controllare che non ci siano due alimenti con la stessa sequenza di carico
    private controlloSequenza=(req: Request, res: Response,next :NextFunction):void => { 
        const sequenzeArray: number [] =  req.body.map((alimento: { sequenza: number; })=>alimento.sequenza)//salvo tutte le sequenze in un array
        if(this.haDuplicati(sequenzeArray)){ //controllo che non ci sia un numero ripetuto due volte  nella sequenza
            this.inviaErrore(StatusCodes.BAD_REQUEST,CustomErrorTypes.BAD_REQUEST,"Ci sono almeno due alimenti con la stessa sequenza di carico",res)
        }else
        next()
    }
    //metodo per controllare se l'utente ha repetuto l'alimento due volte in un ordine
    private controlloAlimentiDuplicati=(req: Request, res: Response,next :NextFunction):void =>{
        const IDArray: number [] =  req.body.map((alimento: { idAlimento: number; })=>alimento.idAlimento)//salvo tutte le sequenze in un array
        if(this.haDuplicati(IDArray)){ //controllo che non ci sia un numero ripetuto due volte  nella sequenza
            this.inviaErrore(StatusCodes.BAD_REQUEST,CustomErrorTypes.BAD_REQUEST,"C'è un alimento ripetuto nella lista",res)
        }else
        next()
    }

        //metodo che verifica se gli id ricevuti dal cliente sono validi
    private controlloIdAlimenti= async (req: Request, res: Response,next :NextFunction):Promise<void> =>{
        const listaIdAlimentiOrdine: number[] = req.body.map((alimento: { idAlimento: number; }) => alimento.idAlimento);//mappo id in una lista di numeri
            //comunico con alimento controller tramite mediator per chiedergli di verificare la lista di id 
            const listaAlimenti = await this.mediator.verificaIdAlimenti(listaIdAlimentiOrdine); 
            //mediator mi restituisce la lista degli id trovati nel sistema 
            const idMancanti = listaIdAlimentiOrdine.filter(id => !listaAlimenti.map(alimento => alimento.dataValues.id).includes(id));// Trovo gli ID che non esistono in listaAlimenti
            //se ci sono id non validi mando un errore al cliente
            if (idMancanti.length > 0) {
                const alimentiNonTrovati = errorFactory(CustomErrorTypes.BAD_REQUEST); //creo un errore
                res.status(StatusCodes.BAD_REQUEST).send(alimentiNonTrovati("i seguenti ID di alimenti non sono presenti nel sistema : "+ idMancanti))
            } else {//altrimenti passo al middleware seguente
                next()
            }
    }
            
    //metodo per controllare che non ci sono due numeri duplicati in una lista
    private haDuplicati=(lista: number[]):boolean =>{ return new Set(lista).size < lista.length}

    private inviaErrore=(statusCode:number ,tipoErrore: string, messaggio: string, res:Response):void=>{ res.status(statusCode).send(errorFactory(tipoErrore)(messaggio))}

}

export default OrdineController;