
//sereve.ts è l'entry point
import 'dotenv/config';
import App from './app.js';
import AlimentoController from './controllers/AlimentoController.js';
import OrdineController from './controllers/OrdineController.js';
import ConcreteMediator from './controllers/ConcreteMediator.js';
//creo un istanza di APP passandogli i controllori

const alimentoController=new AlimentoController();
const ordineController= new OrdineController();
const app = new App(
[  alimentoController,
  ordineController
]
);

const mediator = new ConcreteMediator(alimentoController, ordineController);



app.listen();

