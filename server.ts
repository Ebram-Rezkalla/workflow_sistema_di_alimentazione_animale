
//sereve.ts è l'entry point
import 'dotenv/config';
import App from './app.js';
import AlimentoController from './controllers/AlimentoController.js';
//creo un istanza di APP passandogli i controllori
const app = new App(
[  new AlimentoController()
]
);
/*app.getServer().get('/', function (req, res) {
  res.send('Hello sei autenticato');
});*/

app.listen();

