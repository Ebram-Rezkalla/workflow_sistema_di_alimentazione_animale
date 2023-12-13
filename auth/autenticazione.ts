
import { NextFunction, Response,Request,ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
import { env } from 'node:process';
import { CustomErrorTypes, errorFactory } from 'error-handler-module';

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
          const tokenNonValido = errorFactory(CustomErrorTypes.UNAUTHORIZED);
          res.status(StatusCodes.UNAUTHORIZED).send(tokenNonValido("autenticazione non riuscita, il token non è valido"));
          
        }
      }else{
        res.status(StatusCodes.UNAUTHORIZED).send(tokenNonValido("autenticazione non riuscita, non è stato trovato il token"));
      }
    }


    
export default verifyAndAuthenticate;

function tokenNonValido(arg0: string): any {
  throw new Error('Function not implemented.');
}
