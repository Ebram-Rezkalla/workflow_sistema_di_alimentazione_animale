import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import  handleHttpError, { CustomErrorTypes, errorFactory }  from 'error-handler-module';
import 'dotenv/config';

    
    // controllo header delle richiesta per l'autorizazzione
   function  checkHeader (req: Request, res: Response,next :NextFunction){
        const authHeader = req.headers.authorization;
        if (authHeader) {
            next(); // se esiste il parametro authorization passo la richeista
        }else{
            const noHeaderError = errorFactory(CustomErrorTypes.UNAUTHORIZED);
           res.status(StatusCodes.UNAUTHORIZED).send(noHeaderError("autenticazione non riuscita, no header")); //sennò mando l'errore
        }
    }; 
    export default checkHeader;