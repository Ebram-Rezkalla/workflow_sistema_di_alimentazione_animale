import { NextFunction, Response,Request,ErrorRequestHandler, Router } from 'express';
import { ValidationError } from "express-json-validator-middleware";
import { StatusCodes } from 'http-status-codes';




//funzione middleware per gestire gli errori di validazione 
function errorhandler(err:ValidationError,req: Request, res: Response,next :NextFunction){
    res.status(StatusCodes.BAD_REQUEST).send(err.validationErrors.body)
  }

  export default errorhandler;
