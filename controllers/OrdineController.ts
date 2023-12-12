import { NextFunction, Response,Request,ErrorRequestHandler, Router } from 'express';
import Controller from "../interfaces/controllerInterface.js";
import AlimentoModel from "../models/AlimentoModel.js";
import verifyAndAuthenticate from '../auth/autenticazione.js';
import checkHeader from '../auth/checkHeader.js';
import alimentoSchema from '../validation/alimentoSchema.js';
import { Validator } from 'express-json-validator-middleware';
import { StatusCodes } from 'http-status-codes';
import modificaAlimentoSchema from '../validation/modificaAlimentoSchema.js';
import { CustomErrorTypes, errorFactory } from 'error-handler-module';
import { Model, Sequelize, json } from 'sequelize';
import errorValidationHandler from '../validation/errorValidationHandler.js';
import scaricoSchema from '../validation/scaricoSchema.js';
import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import ordineSchema from '../validation/ordineSchema.js';
import { todo } from 'node:test';
import BaseController from './BaseController.js';
import OrdineModel from '../models/OrdineModel.js';
import DettagliOrdine from '../models/DettagliOrdine.js';
import StatoOrdine from '../models/StatoOrdine.js';
import presaInCaricoSchema from '../validation/presaInCaricoSchema.js';
import caricoSchema from '../validation/caricoSchema.js';
import dettagliOrdine from '../db/dettagliOrdine.js';


//classe per il controllo degli ordini
class OrdineController extends BaseController implements Controller {
    public path = '/ordini';
    public router = Router();
    private ordine= new OrdineModel; //creo un istanza del modello ordine
    private validator =new Validator({allErrors: true});// Without allErrors: true, ajv will only return the first error

    constructor() {
       
        super();
      this.initializeRoutes();// inizializzo le rotte

    }
  
    private async initializeRoutes() {
      
      this.router.post(`${this.path}/crea`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:ordineSchema}),
      errorValidationHandler,this.controlloAlimentiDuplicati,this.controlloSequenza,this.controlloIdAlimenti,this.controlloDisponibilitàAlimenti,this.creaOrdine);//rotta creazione ordine
      
      this.router.post(`${this.path}/presa-in-carico`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:presaInCaricoSchema}),
      errorValidationHandler,this.controlloIdOrdine,this.presaInCaricoOrdine);

      this.router.post(`${this.path}/carica`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:caricoSchema}),
      errorValidationHandler,this.controlloIdOrdine,this.controlloAlimento,this.controlloStatoCaricamento,this.controlloSequenzaDiCarico,
      this.controlloQuantitàCaricata,this.caricaAlimentoDiUnOrdine,this.controlloCompletamentoOrdine);

      this.router.get(`${this.path}/stato/:id`, checkHeader ,verifyAndAuthenticate,this.controlloIdOrdine, this.getStatoOrdine);
    
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
    //metodo per prendere in carico un ordine
    private presaInCaricoOrdine=(req: Request, res: Response, next: NextFunction )=>{

        const risposta= this.ordine.presaInCarico()//se il model mio risponde con una stringa la rinvio al cliente
            if (typeof risposta === 'string'){
                const messaggio = {
                    messaggio: risposta
                };
                res.send(messaggio)
            }else //altrimenti invio l'errore restituito
                res.status(StatusCodes.BAD_REQUEST).send(risposta)
    }
    //metodo che controlla se ID dell'ordine è corretto
    private controlloIdOrdine = async (req: Request, res: Response, next: NextFunction) => {
        const idOrdine = req.body.id || req.params.id;
    
        if (!idOrdine) {
            const messaggioErrore = "ID dell'ordine non fornito.";
            this.inviaErrore(StatusCodes.BAD_REQUEST, CustomErrorTypes.BAD_REQUEST, messaggioErrore, res);
        } else {
            // Il metodo inizializzaStato fa una chiamata al db con id dell'ordine
            // poi imposta gli attributi id e stato della classe OrdineModel
            this.ordine.inizializzaStato(idOrdine).then((ordine) => {
                if (ordine) {
                    next();
                } else {
                    const messaggioErrore = "Ordine non trovato, si prega di verificare l'ID inserito.";
                    this.inviaErrore(StatusCodes.BAD_REQUEST, CustomErrorTypes.BAD_REQUEST, messaggioErrore, res);
                }
            });
        }
    }
    
    //metodo che verifica se l'alimento esiste nella lista dell'ordine
    private controlloAlimento = async (req: Request, res: Response, next: NextFunction)=>{

        const risposta=await this.ordine.controlloAlimento(req.body.idAlimento)//in base allo stato dell'ordine ottengo la risposta
            if ( typeof risposta === 'string'){//nel caso che una stringa allora l'ordine non è IN ESECUZIONE oppure l'alimento non è presente nell'ordine
                this.inviaErrore(StatusCodes.BAD_REQUEST,CustomErrorTypes.BAD_REQUEST,risposta,res)

            }else{
                next(risposta)
                
            }

    
        
    }
    //metodo che controlla se l'alimento è stato caricato o meno
    private controlloStatoCaricamento = async (alimentoOrdine: Model<any,any>,req: Request, res: Response, next: NextFunction)=>{
        if(alimentoOrdine.dataValues.caricato) {
            const messaggioErrore= "L'alimento è stato già caricato"
            this.inviaErrore(StatusCodes.BAD_REQUEST,CustomErrorTypes.BAD_REQUEST,messaggioErrore,res)
        } 
        else
            next(alimentoOrdine)
    }

    //metodo per controllare la sequenza di carico
    private controlloSequenzaDiCarico = async (alimentoOrdine: Model<any, any>, req: Request, res: Response, next: NextFunction) => {
            //controllo se l'alimento che precede (nella sequenza di carico) l'alimento da caricare è stato caricato o meno
            this.ordine.getAlimentoOrdineConSequenza( alimentoOrdine.dataValues.sequenza - 1).then((alimentoSequenzaPrecedente)=>{
            //se l'alimento da caricare era il primo nella sequenza di carico allora  if non sarà verificata
            //se non è il primo nella sequenza di carico e l'alimento precedente  è stato caricato if non sarà verificata 
            //invece se non è il primo nella sequenza di carico e l'alimento precedente non è stato caricato if sarà verificata 
            if (alimentoSequenzaPrecedente && !alimentoSequenzaPrecedente.dataValues.caricato) {
                const messaggioErrore = "L'ordine è fallito in quanto non è stata rispettata la sequenza di carico";
                this.fallimentoOrdine(messaggioErrore,res)
            } else {
                next(alimentoOrdine);
            }
        })
        
    };

    //metodo per verificare se la quanità caricata devia da una data tolleranza
    private controlloQuantitàCaricata = async (alimentoOrdine: Model<any, any>,req: Request, res: Response, next: NextFunction) => {

            const quantitàRichiesta = alimentoOrdine.dataValues.quantità_richiesta;
            const quantitàCaricata = req.body.quantità_caricata;
    
            const percentualeTolleranza:any  = process.env.N;
    
            const differenzaPercentuale = Math.abs((quantitàCaricata - quantitàRichiesta) / quantitàRichiesta) * 100;
    
            if (differenzaPercentuale > percentualeTolleranza) {
                const messaggioErrore = `L'ordine è fallito perché la quantità caricata è fuori dalla tolleranza consentita `;
                this.fallimentoOrdine(messaggioErrore,res)
            } else {
                next(alimentoOrdine);
            }
    };

    //metodo per gestire il caricamento di alimento
    private caricaAlimentoDiUnOrdine=async(alimentoOrdine: Model<any, any>,req: Request, res: Response, next: NextFunction)=>{

            this.ordine.addOperazioneCaricamento(req.body.idAlimento,req.body.quantità_caricata) //aggiungo un'operazione di caricamento al db
            this.ordine.changeToCaricatoStatoAlimento(req.body.idAlimento)// cambio lo stato dell'alimento a caricato= true
            this.mediator.notifyCaricamento(req.body.idAlimento,- req.body.quantità_caricata,-alimentoOrdine.dataValues.quantità_richiesta)//invio una notifica a AlimentoController per aggiornare la disponibilità e la quantità riservata
            const messaggio: { messaggio: string } = {
                messaggio: "Caricato " + req.body.quantità_caricata + " Kg di Alimento ID: " + req.body.idAlimento + " relativo all'ordine ID: " + req.body.id
            };
            next(messaggio)
    }
        //metodo per controllare se gli alimenti dell'ordine sono stati tutti caricati e di sequenza aggiornare lo stato dell'ordine a Completato 
        private controlloCompletamentoOrdine = async (caricamentoRes: { messaggio: string,statoOrdine?:string}, req: Request, res: Response, next: NextFunction) => {
            const alimentiOrdine = await this.ordine.getAlimentiOrdine();
        
            // Verifico se tutti gli alimenti sono caricati
            const tuttiCaricati = alimentiOrdine.every((alimento) => alimento.dataValues.caricato);
        
            if (tuttiCaricati) {
                // Se tutti gli alimenti sono caricati, aggiorno lo stato dell'ordine
                const risposta = this.ordine.aggiornaStatoOrdineCompletato();
                if(typeof risposta==='string'){
                    caricamentoRes.statoOrdine=risposta;
                    res.send(caricamentoRes);
                }else
                res.status(StatusCodes.BAD_REQUEST).send(risposta)
            } else{
                res.send(caricamentoRes)
            }

        }
        //metodo per gestire il fallimento di un ordine
    private async fallimentoOrdine(messaggioErrore: string, res:Response){


        const alimentiDaLiberareQuantità = await this.ordine.getAlimentiOrdineDaLiberare(); // Ricavo gli alimenti dell'ordine che non sono ancora stati caricati così da liberare le quantità riservate in quanto è fallito 
        const ListaAlimentiDaLiberareQuantità: DettagliOrdine[] = alimentiDaLiberareQuantità.map((alimento: Model<any, any>) =>
            new DettagliOrdine(alimento.dataValues.AlimentoId, -alimento.dataValues.quantità_richiesta, alimento.dataValues.sequenza)
        ); //mappo gli alimenti in un oggetto di tipo DettagliOrdine aggiungendo il meno davanti alla quantità richiesta
            console.log(ListaAlimentiDaLiberareQuantità)
        this.mediator.aggiornaQuantitàRiservata(ListaAlimentiDaLiberareQuantità)//avviso la classe AlimentoController per libera le quantità riservate dall'ordine che è diventato fallito

        await this.ordine.aggiornaStatoOrdineToFallito();//aggiorno lo stato dell'ordine

        this.inviaErrore(StatusCodes.BAD_REQUEST, CustomErrorTypes.BAD_REQUEST, messaggioErrore, res);

    }

        //metodo per ottenere lo stato dell'ordine 
    private getStatoOrdine= async(req: Request, res: Response, next: NextFunction)=>{

        const statoOrdine= await this.ordine.getStatoOrdine()
        res.send(statoOrdine)
    }
    
    
    
     
    //metodo per controllare che non ci sono due numeri duplicati in una lista
    private haDuplicati=(lista: number[]):boolean =>{ return new Set(lista).size < lista.length}
    
    // metodo per creare un errore e inviarlo 
    private inviaErrore=(statusCode:number ,tipoErrore: string, messaggio: string, res:Response):void=>{ res.status(statusCode).send(errorFactory(tipoErrore)(messaggio))}

}

export default OrdineController;