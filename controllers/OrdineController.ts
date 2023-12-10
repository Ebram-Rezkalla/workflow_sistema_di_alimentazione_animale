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
import { Model, json } from 'sequelize';
import errorValidationHandler from '../validation/errorValidationHandler.js';
import scaricoSchema from '../validation/scaricoSchema.js';
import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ordineSchema from '../validation/ordineSchema.js';
import { todo } from 'node:test';
import BaseController from './BaseController.js';
import OrdineModel from '../models/OrdineModel.js';
import DettagliOrdine from '../models/DettagliOrdine.js';


//classe per il controllo degli ordini
class OrdineController extends BaseController implements Controller {
    public path = '/ordini';
    public router = Router();
    private ordine = new OrdineModel; //creo un istanza del modello ordine
    private validator =new Validator({allErrors: true});// Without allErrors: true, ajv will only return the first error

    constructor() {
       
        super();
      this.initializeRoutes();// inizializzo le rotte

    }
  
    private initializeRoutes() {
      
      this.router.post(`${this.path}/crea`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:ordineSchema}),
      errorValidationHandler,this.controlloAlimentiDuplicati,this.controlloSequenza,this.controlloIdAlimenti,this.controlloDisponibilitàAlimenti,this.creaOrdine);//rotta creazione ordine
      
    
    }

    
    //metodo per creare un nuovo ordine 
    private creaOrdine = async (req: Request, res: Response, next: NextFunction) => {
        //creo oggetti di tipo DettagliOrdine 
        const alimentiOrdine :DettagliOrdine[] = req.body.map((alimento: DettagliOrdine) => new DettagliOrdine(alimento.idAlimento, alimento.quantità_richiesta, alimento.sequenza));
       //passo la lista al metodo addOrdine contente gli alimenti di un ordine
       //chiamo il modello di ordine per creare un nuovo ordine e aggiungerlo al db
       this.ordine.addOrdine(alimentiOrdine).then((result)=>{
        this.mediator.aggiornaQuantitàRiservata(alimentiOrdine)
        res.status(StatusCodes.CREATED).send(result);}); 
        
    };
    

        //metodo per controllare che non ci siano due alimenti con la stessa sequenza di carico
    private controlloSequenza=(req: Request, res: Response,next :NextFunction):void => { 
        const sequenzeArray: number [] =  req.body.map((alimento: { sequenza: number; })=>alimento.sequenza)//salvo tutte le sequenze in un array
        if(this.haDuplicati(sequenzeArray)){ //controllo che non ci sia un numero ripetuto due volte  nella sequenza
            this.inviaErrore(StatusCodes.BAD_REQUEST,CustomErrorTypes.BAD_REQUEST,"Ci sono almeno due alimenti con la stessa sequenza di carico",res)
        }else
        next()
    }
    //metodo per controllare se l'utente ha repetuto l'alimento due volte in un Ordine
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
            //comunico con alimento controller tramite mediator per chiedergli la lista degli alimenti
            const listaAlimenti = await this.mediator.getAlimentiDaAlimentoController(listaIdAlimentiOrdine); 
            //mediator mi restituisce la lista degli id trovati nel sistema 
            const idMancanti = listaIdAlimentiOrdine.filter(id => !listaAlimenti.map(alimento => alimento.dataValues.id).includes(id));// Trovo gli ID che non esistono in listaAlimenti

            //se ci sono id non validi mando un errore al cliente
            if (idMancanti.length > 0) {
                const idMancantiOrdinata = idMancanti.slice().sort((a , b) => a - b);//metto la lista in ordine 
                const messaggioErrore = "i seguenti ID di alimenti non sono presenti nel sistema: " + idMancantiOrdinata.map((idMancante: number) => `ID: ${idMancante}`).join(', ');
                this.inviaErrore(StatusCodes.BAD_REQUEST,CustomErrorTypes.BAD_REQUEST,messaggioErrore,res)
            } else {//altrimenti passo al middleware seguente
                next(listaAlimenti)
            }
    }
        //metodo per controllare la disponibilità degli alimenti 
    private controlloDisponibilitàAlimenti = async ( listaAlimenti:  Model<any, any>[],req: Request, res: Response, next: NextFunction) => {
        //filtro in base al ID e se la disponibilità è minore cosi da creare una lista di alimenti insufficiente
        const alimentiInsufficienti = (await listaAlimenti).filter(alimento => {
            const richiestaCorrispondente = req.body.find((alimentoRichiesto: { idAlimento: number; quantità_richiesta: number; }) => alimentoRichiesto.idAlimento === alimento.dataValues.id);
    
            // Controllo se l'alimento è insufficiente
            return richiestaCorrispondente &&  richiestaCorrispondente.quantità_richiesta> alimento.dataValues.disponibilità - alimento.dataValues.quantità_riservata;//quantità riservata è la quantità di un alimento riservata da altri ordini
        });
    
        if (alimentiInsufficienti.length > 0) {
            const messaggioErrore = `La disponibilità di alcuni alimenti è insufficiente: ${alimentiInsufficienti.map(alimento => `ID: ${alimento.dataValues.id}`).join(', ')}`;
            this.inviaErrore(StatusCodes.BAD_REQUEST, CustomErrorTypes.BAD_REQUEST, messaggioErrore, res);
        } else {
            next();
        }
    };
     
    //metodo per controllare che non ci sono due numeri duplicati in una lista
    private haDuplicati=(lista: number[]):boolean =>{ return new Set(lista).size < lista.length}
    
    // metodo per creare un errore e inviarlo 
    private inviaErrore=(statusCode:number ,tipoErrore: string, messaggio: string, res:Response):void=>{ res.status(statusCode).send(errorFactory(tipoErrore)(messaggio))}

}

export default OrdineController;