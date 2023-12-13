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
import { Model, json } from 'sequelize';
import errorValidationHandler from '../validation/errorValidationHandler.js';
import scaricoSchema from '../validation/scaricoSchema.js';
import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import BaseController from './BaseController.js';
import DettagliOrdine from '../models/DettagliOrdine.js';
import moment from 'moment';
import verificaDate from '../middlewares/verificaDate.js';
import verificaFormatoDate from '../middlewares/verificaFormatoDate.js';
import verificaPrecedenzeDate from '../middlewares/verificaPrecedenzeDate.js';


//classe per il controllo degli alimenti
class AlimentoController extends BaseController implements Controller {
    
    
    public path = '/alimenti';
    public router = Router();
    private alimento = new AlimentoModel; //creo un istanza del modello alimento
    private validator =new Validator({allErrors: true});// Without allErrors: true, ajv will only return the first error

    constructor() {
      super();
      this.initializeRoutes();// inizializzo le rotte

    }
  
    private initializeRoutes() {
      
      this.router.post(`${this.path}/add`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:alimentoSchema}),errorValidationHandler,this.addAlimento);//rotta creazione alimento
      
      this.router.patch(`${this.path}/modifica/:id`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:modificaAlimentoSchema}),errorValidationHandler,this.verificaIdAlimento,this.modificaAlimento);// rotta modifica alimento
      
      this.router.post(`${this.path}/scarica`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:scaricoSchema}),errorValidationHandler,this.verificaIdAlimento,this.scaricaAlimento);//rotta scaricamento alimento
      
      this.router.get(`${this.path}/operazioni/:id`, checkHeader, verifyAndAuthenticate,verificaDate(true),verificaFormatoDate,verificaPrecedenzeDate,this.verificaIdAlimento,this.elencoOperazioniAlimento);

    }
  
    //metodo per creare un nuovo alimento
    private addAlimento=async (req: Request, res: Response,next :NextFunction) =>{
      
      this.alimento.addAlimento(req.body.nome,req.body.disponibilità).then((alimento)=>{
        //se la disponibilità introdotta dal utente è maggiore di 0 aggiungo automaticamente un'operazione di scarico
      if(req.body.disponibilità>0){
        this.alimento.scaricaAlimento(alimento,req.body.disponibilità)
      }

      res.status(StatusCodes.CREATED).send(alimento);}); //chiamo il modello di alimentazione per aggiungere alimento al db
    }

  private modificaAlimento=async (alimento: Model<any, any>,req: Request, res: Response,next :NextFunction) =>{
    
    await this.alimento.modificaAlimento(alimento.dataValues.id,req.body.nome)
      const messaggio= {
        messaggio: "alimento aggiornato correttamente",  
      }
    res.send(messaggio);
  }  
    //metodo per lo scarico di un alimento
  private scaricaAlimento=async (alimento: Model<any, any> , req: Request, res: Response,next :NextFunction) =>{
    //cerco l'alimento con id passato dal cliente 
    this.alimento.scaricaAlimento(alimento, req.body.quantità).then((alimento) => { 
      const messaggio = {
        messaggio: 'quantità scaricata correttamente, la nuova disponibilità è '+alimento?.dataValues.disponibilità+' kg',
      };
        res.send(messaggio);
    }); 
  } 

  //metodo che recupera le operaioni di carico e scarico di un alimento
  private elencoOperazioniAlimento = async (alimento: Model<any, any>,req: Request, res: Response, next: NextFunction) => {
    
      const idAlimento = parseInt(alimento.dataValues.id);
      //converto le Date al tipo Date
      const dataInizio = new Date(`${req.query.dataInizio}T00:00:00.000Z`);
      const dataFine= new Date(`${req.query.dataFine}T23:59:59.999Z`);
      //creo un oggetto per icludere tutte le operazioni
      const operazioni: {Filtro_applicato:string,Operazioni_di_scarico:string | Model<any, any>[],Operazioni_di_carico:string|Model<any, any>[]}= {
        Filtro_applicato: "da: "+req.query.dataInizio+" a: "+req.query.dataFine,
        Operazioni_di_scarico:"Non esistono operazioni di scarico",
        Operazioni_di_carico:"Non esistono operazioni di carico"
      };
        //recupero le operazioni di scarico filtrate
      const scaricamentiFiltrati= await this.alimento.getScaricamentiFiltratiByData(idAlimento,dataInizio,dataFine);
      //se ci sono operazioni di scarico vado a recuperare le operazioni di carico tramite mediator dal OrrdineController 
      if(scaricamentiFiltrati.length!==0){ 
        //qua recupero le operazioni di carico filtrate
        const caricamentiFiltrati= await this.mediator.getCaricamentiFiltratiDaOrdineController(idAlimento,dataInizio,dataFine);
        //se ci sono  operazioni di caricamento assegno gli array agli attributi Operazioni_di_scarico e Operazioni_di_carico dell'oggetto operazioni e invio al cliente  
        if(caricamentiFiltrati.length!==0){
          operazioni.Operazioni_di_scarico= scaricamentiFiltrati;
          operazioni.Operazioni_di_carico= caricamentiFiltrati;
          res.send(operazioni);
          //altrimenti invio solo le operazioni di scarico
        } else {
          operazioni.Operazioni_di_scarico=scaricamentiFiltrati;
          res.send(operazioni)
        } 
        //altrimenti invio l'oggetto operazioni come è stato creato sopra in quanto se non ci sono operazioni di scarico nin ci saranno quelle di carico
      }else{
        res.send(operazioni); 
      }

  }
  //metodo che verifica se ID dell'alimento sia corretto
  private verificaIdAlimento = async (req: Request, res: Response, next: NextFunction) => {
    //siccome questo metodo viene invocato sia da una rotta post che da una rotta get, allora vado a cercare dove si trova ID
    const idAlimento = req.body.id || parseInt(req.params.id);
    //recupero l'alimento
    this.alimento.getALimentoById(idAlimento).then((alimento)=>{
      //se l'alimento non esiste invio l'errore
      if(!alimento){
      const idNonTrovato = errorFactory(CustomErrorTypes.BAD_REQUEST); //creo un errore
      res.status(StatusCodes.BAD_REQUEST).send(idNonTrovato("alimento non trovato, si prega di verificare id inserito"));//invio l'errore 
      }else {
        //altrimenti proseguo
      next(alimento)  
      }
    })
  }

  
    //metodo che recupera una lista di alimenti passati  
  public async getAlimenti(listIdAlimentiOrdine: number[]): Promise<Model<any, any>[]>{
    
    return this.alimento.getAlimenti(listIdAlimentiOrdine)
  }

    //metodo che aggiorna la quantità riservata di una lista di alimenti
  public aggiornaQuantitàRiservata(alimentiOrdine: DettagliOrdine[]):void {
    this.alimento.aggiornaQuantitàRiservata(alimentiOrdine)
}
  //metodo che aggiorna sia la disponibilità che la quantità riservata di un alimento e questo metodo viene invocato all'atto del caricamento di un alimento
  public aggiornaQuantitàRiservataAndDisponibilità(idAlimento: number, quantità_caricata: number,quantità_richiesta:number) {
    this.alimento.aggiornaQuantitàRiservataAndDisponibilità(idAlimento, quantità_caricata,quantità_richiesta)

  }
}
  export default AlimentoController;