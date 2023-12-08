import { CustomError, CustomErrorTypes, errorFactory } from 'error-handler-module';
import { NextFunction, Response,Request,ErrorRequestHandler, Router } from 'express';
import { StatusCodes } from 'http-status-codes';




//funzione middleware per gestire gli errori di Json Parsing 

function errorParsingHandler(err:ErrorRequestHandler,req: Request, res: Response,next :NextFunction){
  
  if(err instanceof  SyntaxError){
      const jsonParserError = errorFactory(CustomErrorTypes.BAD_REQUEST);
      res.status(StatusCodes.BAD_REQUEST).send(jsonParserError("Json non è coretto"));
      
    }
    else 
    next()
}

    export default errorParsingHandler;
  
  
