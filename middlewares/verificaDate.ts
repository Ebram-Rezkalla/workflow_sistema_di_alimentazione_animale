import { CustomErrorTypes, errorFactory } from 'error-handler-module';
import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

//una funzione che verifica se esistono tutte due le date oppure esiste almeno una 
//quando la variabile entrambeObbligatori è settata a true signfica che devono esistere tutte due le date oppure il metodo manda un errore
//quando la variabile entrambeObbligatori è settata a false signfica che deve esistere almeno una data delle oppure manda un errore
const  verificaDate = (entrambeObbligatorie: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    const DataInizio = req.query.dataInizio 
    const DataFine = req.query.dataFine 

    if ((entrambeObbligatorie && (!DataInizio || !DataFine)) || (!entrambeObbligatorie && !DataInizio && !DataFine)) {
        const dateNonTrovate = errorFactory(CustomErrorTypes.BAD_REQUEST);
        const messaggioErrore = entrambeObbligatorie ? 'Devi fornire sia dataInizio che dataFine' : 'Devi fornire almeno una tra dataInizio e dataFine';
        res.status(StatusCodes.BAD_REQUEST).send(dateNonTrovate(messaggioErrore));
    } else {
        next();
    }
}

export default verificaDate;