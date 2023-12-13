import { CustomErrorTypes, errorFactory } from 'error-handler-module';
import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';


//metodo che verifica il se il formato delle date passate dall'utenete sia valido 
const verificaFormatoDate = async (req: Request, res: Response, next: NextFunction) => {
    const FormatoNonValido = errorFactory(CustomErrorTypes.BAD_REQUEST)("Formato data non valido. Usa il formato YYYY-MM-DD");//creo l'errore
    //una funzione ausiliaria per validare il formato
    const isValidDate = (data: string ): boolean => {
        return data !== undefined && moment(data, 'YYYY-MM-DD', true).isValid();
    };

    const haDataInizio = req.query.dataInizio !== undefined;
    const haDataFine = req.query.dataFine !== undefined;
    //se ci sono tutte due le date, verifico se non sono valide altrimenti mando l'errore
    if ((haDataInizio && haDataFine) && (!isValidDate(req.query.dataInizio as string) || !isValidDate(req.query.dataFine as string))) {
        res.status(StatusCodes.BAD_REQUEST).send(FormatoNonValido);
        //se non ci sono tutte due le date, verifico se c'è la data di inizio e se non è valida 
    } else if (haDataInizio && !isValidDate(req.query.dataInizio as string)) {
        res.status(StatusCodes.BAD_REQUEST).send(FormatoNonValido);
        //se non c'è la data di inizio, verifico se c'è la data di fine e se non è valida 
    } else if (haDataFine && !isValidDate(req.query.dataFine as string)) {
        res.status(StatusCodes.BAD_REQUEST).send(FormatoNonValido);
    } else {
        //altrimenti prosegue
        next();
    }
};

  export default verificaFormatoDate;