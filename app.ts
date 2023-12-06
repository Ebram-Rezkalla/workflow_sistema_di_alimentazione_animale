import express, { Express, Request, Response,NextFunction } from 'express';
import Autenticazione from './auth/autenticazione';
import { handleHttpError } from 'error-handler-module';
import Controller from './interfaces/controllerInterface.js';
import bodyParser from 'body-parser';

//classe che definisce l'applicazione express con middleware controllori
class App {
    public app: express.Application;
  
    constructor(controllers: Controller[]) {
      this.app = express();
  
      this.initializeMiddlewares(); 
      this.initializeControllers(controllers);

     /* this.initializeErrorHandling();*/
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
          console.log(`App listening on the port ${process.env.PORT}`);
        });
      }
    
    public getServer() {
        return this.app;
      }
    
      private initializeMiddlewares() {
        this.app.use(bodyParser.json());//bodyparsers per ricavare il body della richiesta
      }

      private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
          this.app.use('/', controller.router);//inizializzo i controllori passandogli Router
        });
      }
}
    
    export default App;