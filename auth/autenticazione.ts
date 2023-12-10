
import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
import { env } from 'node:process';

// verifico l'autenticazione

    function verifyAndAuthenticate(req: Request, res: Response, next: NextFunction) {
        const bearerHeader = req.headers.authorization;
      if(typeof bearerHeader!=='undefined'){
          const bearerToken = bearerHeader.split(' ')[1];
          try {
            const jwtSecret:any = process.env.JWT_SECRET;
            jwt.verify(bearerToken, jwtSecret);
            next();
          } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).send({"error": error});
          }
       
          //const tokenNonValido = errorFactory(CustomErrorTypes.UNAUTHORIZED);
          //res.status(StatusCodes.FORBIDDEN).send(tokenNonValido("autenticazione non riuscita, il token non è valido"));
          }
      else{
        //const tokenNonTrovato = errorFactory(CustomErrorTypes.UNAUTHORIZED);
        res.status(StatusCodes.UNAUTHORIZED).send("autenticazione non riuscita, non è stato trovato il token");// esiste authorization ma non esiste token
      }
    }


    
export default verifyAndAuthenticate;