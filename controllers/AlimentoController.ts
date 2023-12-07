import { NextFunction, Response,Request,ErrorRequestHandler, Router } from 'express';
import Controller from "../interfaces/controllerInterface.js";
import AlimentoModel from "../models/AlimentoModel.js";
import verifyAndAuthenticate from '../auth/autenticazione.js';
import checkHeader from '../auth/checkHeader.js';
import alimentoSchema from '../validation/alimentoSchema.js';
import errorhandler from '../validation/errorHandler.js';
import { Validator } from 'express-json-validator-middleware';
import { StatusCodes } from 'http-status-codes';
import modificaAlimentoSchema from '../validation/modificaAlimentoSchema.js';
import { CustomErrorTypes, errorFactory } from 'error-handler-module';
import { json } from 'sequelize';


//classe per il controllo degli alimenti
class AlimentoController implements Controller {
    public path = '/alimenti';
    public router = Router();
    private alimento = new AlimentoModel; //creo un istanza del modello alimento
    private validator =new Validator({allErrors: true});// Without allErrors: true, ajv will only return the first error

    constructor() {
      this.initializeRoutes();// inizializzo le rotte

    }
  
    private initializeRoutes() {
      this.router.post(`${this.path}/add`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:alimentoSchema}),errorhandler,this.addAlimento);//rotta creazione alimento
      this.router.patch(`${this.path}/modifica/:id`, checkHeader ,verifyAndAuthenticate,this.validator.validate({body:modificaAlimentoSchema}),errorhandler,this.modificaAlimento);
      //this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
    }
  
  
   /* private getallAlimenti= async (req: Request, res: Response,next :NextFunction) =>{
   this.alimento.getAlimenti().then((result)=>{res.send(result);});
    
  }*/
    //metodo per creare un nuovo alimento
    private addAlimento=async (req: Request, res: Response,next :NextFunction) =>{
      console.log(req.body);
      //
      this.alimento.addAlimento(req.body.nome,req.body.disponibilità).then((result)=>{res.status(StatusCodes.CREATED).send(result);}); //chiamo il modello di alimentazione per aggiungere alimento al db

  }

  private modificaAlimento=async (req: Request, res: Response,next :NextFunction) =>{
    //
    this.alimento.modificaAlimento(parseInt(req.params.id),req.body.nome).then((result)=>{
      if(result[0]==0) {// se nessun row è stato modificato siginfica che id non è coretto 
      const alimentoNonEsistente = errorFactory(CustomErrorTypes.BAD_REQUEST); //creo un errore
      res.status(StatusCodes.BAD_REQUEST).send(alimentoNonEsistente("alimento non trovato, si prega di verificare id inserito"));//invio l'errore 
      }
      else{// altrimenti significa che l'alimento è stato modifcato corettamente
      
      const messaggio:any = {
              messaggio: "alimento aggiornato corretamente",  
     }
      res.send(JSON.stringify(messaggio));
    }
    });  
     
}
}
  export default AlimentoController;