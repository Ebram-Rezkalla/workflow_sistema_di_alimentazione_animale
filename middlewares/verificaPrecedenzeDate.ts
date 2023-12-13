import { CustomErrorTypes, errorFactory } from 'error-handler-module';
import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
  

//metodo che verifica che dataInizio precede dataFine
const verificaPrecedenzeDate= async (req: Request, res: Response, next: NextFunction) => {
    
    const haDataInizio = req.query.dataInizio !== undefined;
    const haDataFine = req.query.dataFine !== undefined;
    //se ci sono tutte due le data verifico che la dataInizio precede dataFine 
    if (haDataInizio && haDataFine && moment(req.query.dataFine as string).isBefore(req.query.dataInizio as string)) {
      const precedenzaNonValida = errorFactory(CustomErrorTypes.BAD_REQUEST); //creo un errore
      res.status(StatusCodes.BAD_REQUEST).send(precedenzaNonValida("La data di fine deve essere successiva alla data di inizio"));//invio l'errore 
    }else{ //altrimenti prosegue 
      next()
    }
  }

  export default verificaPrecedenzeDate;