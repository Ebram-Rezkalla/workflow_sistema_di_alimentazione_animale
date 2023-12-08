
import { CustomError, CustomErrorTypes, errorFactory } from 'error-handler-module';
import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { ValidationError } from "express-json-validator-middleware";
import { StatusCodes } from 'http-status-codes';
//funzione per gestire gli errori di validazione
function errorValidationHandler(err:ErrorRequestHandler,req: Request, res: Response,next :NextFunction){
  
    if(err instanceof  ValidationError){
        //const validationError = errorFactory(CustomErrorTypes.BAD_REQUEST);
        res.status(StatusCodes.BAD_REQUEST).send(err.validationErrors.body);
      }
      else 
      next()
  }
  
      export default errorValidationHandler;



