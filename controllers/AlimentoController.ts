import { NextFunction, Response,Request,ErrorRequestHandler, Router } from 'express';
import Controller from "../interfaces/controllerInterface.js";
import AlimentoModel from "../models/AlimentoModel.js";
import verifyAndAuthenticate from '../auth/autenticazione.js';
import checkHeader from '../auth/checkHeader.js';
import alimentoSchema from '../validation/alimentoSchema.js';
import errorhandler from '../validation/errorHandler.js';
import { Validator } from 'express-json-validator-middleware';







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
      //this.router.get(`${this.path}/:id/posts`, authMiddleware, this.getAllPostsOfUser);
    }
  
  
   /* private getallAlimenti= async (req: Request, res: Response,next :NextFunction) =>{
   this.alimento.getAlimenti().then((result)=>{res.send(result);});
    
  }*/
    //metodo per creare un nuovo alimento
    private addAlimento=async (req: Request, res: Response,next :NextFunction) =>{
      console.log(req.body);
      //
      this.alimento.addAlimento(req.body.nome,req.body.disponibilità).then((result)=>{res.send(result);}); //chiamo il modello di alimentazione per aggiungere alimento al db


  }
}
  export default AlimentoController;