# workflow_sistema_di_alimentazione_animale

## Obiettivo del Progetto

Il progetto si concentra sulla creazione di un sistema per ottimizzare il workflow di prelievo di alimenti destinati all'alimentazione animale. L'obiettivo primario è sviluppare un ambiente gestionale che permetta agli operatori di eseguire operazioni di prelievo in sequenza, garantendo che ogni passo del processo venga eseguito correttamente e rispettando le quantità richieste.

## Caratteristiche Chiave

1. **Creazione e Gestione Alimenti:** Il sistema permette la creazione, modifica e aggiornamento degli alimenti, specificando le relative quantità disponibili.

2. **Ordini di Prelievo:** Gli operatori possono creare ordini di prelievo specificando gli alimenti e le relative quantità. L'ordine viene verificato e può assumere diversi stati come "CREATO", "FALLITO", "IN ESECUZIONE", "COMPLETATO".

3. **Sequenza Operativa Fondamentale:** Il sistema gestisce attentamente la sequenza delle operazioni, garantendo che ogni passo sia eseguito nel giusto ordine.

4. **Annullamento Automatico:** Gli ordini vengono automaticamente annullati se la sequenza non viene rispettata o se le quantità caricate deviano da quelle richieste oltre una percentuale specificata.

5. **Tracciabilità e Reporting:** Il sistema offre una completa tracciabilità delle operazioni, consentendo agli operatori di visualizzare lo stato corrente di un ordine, evidenziando le operazioni di carico effettuate.

6. **Ottimizzazione Temporale:** Per gli ordini completati, il sistema fornisce informazioni dettagliate, inclusi gli scostamenti tra le quantità richieste e caricate per ciascun alimento, insieme al tempo complessivo richiesto per le operazioni di carico.

## Progettazione
### Lo schema E-R
 ![Lo schema E-R](./immagini/diagramma-ER-.jpg)
### Analisi dei Requisiti
<img src="./immagini/analisi-requisiti.jpg" alt="analisi-requisiti" height="300" >

### Requisiti Funzionali

#### RF1 - Creazione Alimento
- L'operatore autorizzato può creare un nuovo alimento, inserendo dati come nome e disponibilità
#### RF2 - Modifica Alimento
- L'operatore può modificare le informazioni di un alimento esistente per mantenerle aggiornate.

#### RF3 - Scaricamento Alimento
- L'operatore può eseguire operazioni di scarico alimenti specificando la quantità scricata.

#### RF4 - Creazione Ordine
- L'operatore autorizzato può creare un nuovo ordine, specificando gli alimenti desiderati.

#### RF5 - Presa in Carico Ordine
- L'operatore può prendere in carico gli ordini creati.

#### RF6 - Caricamento Alimento
- L'operatore può  effettuare operazioni di carico alimenti relativi ad un ordine specificando la quantità caricata.

#### RF7 - Visualizzazione Stato Ordine
- L'operatore può visualizzare lo stato corrente di un ordine.

#### RF8 - Elenco Operazioni Alimento Filtrate
- Fornisce all'operatore un elenco filtrato delle operazioni sugli alimenti filtrati per data .

#### RF9 - Elenco Stato Ordini Filtrati
- Fornisce all'operatore un elenco filtrato degli stati degli ordini filtrati per data .

### Requisiti Non Funzionali

#### RNF1 - Fallimento dell'Ordine
L'ordine fallisce,se le operazioni di carico non seguono la sequenza prestabilita o se le quantità caricate deviano rispetto al valore richiesto di un determinato percentuale specificato nel file .env.

#### RNF2 - Completamento dell'Ordine
L'ordine è considerato COMPLETATO solo se tutti gli alimenti sono stati caricati nel giusto ordine.

#### RNF3 - Sequenza di Stati dell'Ordine
La sequenza degli stati dell'ordine (CREATO, FALLITO, IN ESECUZIONE, COMPLETATO) è fondamentale per il corretto funzionamento del workflow.

#### RNF4 - Autenticazione JWT
Il sistema richiede l'autenticazione degli operatori attraverso JSON Web Token (JWT) per garantire un accesso sicuro e controllato.

#### RNF5 - Validazione delle Richieste
Il sistema deve effettuare la validazione delle richieste degli operatori per garantire che i dati forniti siano conformi ai requisiti.

#### RNF6 - Tecnologia
Il sistema deve utilizzaare tecnologie specifiche (Node.js, Express,TypeScript,DBMS) per implementare in modo efficiente i requisiti funzionali e non funzionali specificati.

### diagrammi UML
#### 1. Diagramma dei casi d'uso
#### Attori
 <img src="./immagini/UC-attori.jpg" alt="UC-Attori" height="200" >

#### Sistema

 <img src="./immagini/UC-Sistema.jpg" alt="UC-Sistema" height="800" >

#### 2. Diagramma delle classi

<img src="./immagini/diagramma-delle-classi.jpg" alt="classi" >

#### 3. Diagrammi di sequenza
<img src="./immagini/sequenza-crudAlimento.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-c-ordine.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-presaInCarico.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-ElencoStatoOrdini.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-CaricamentoAlimento.jpg" alt="classi"  width="650" >


<img src="./immagini/sequenza-ElencoOperazioniDiUnALimento.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-StatoOrdine.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-RicercaALimento.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-RicercaOrdine.jpg" alt="classi"  width="650" >

<img src="./immagini/AggiornamentoStatoOrdine.jpg" alt="classi"  width="650" >

<img src="./immagini/sequenza-TrovaScaricamenti.jpg" alt="classi"  width="650" >


<img src="./immagini/sequenza-TrovaCaricamenti.jpg" alt="classi"  width="650" >

## Pattern di Progettazione Utilizzati

Nell'implementazione di questo progetto, ho fatto un'attenta scelta dei pattern di progettazione per garantire una struttura chiara e manutenibile. In particolare, ho utilizzato due pattern chiave: il pattern **Mediator** e il pattern **State**.

### Mediator

Il pattern **Mediator** è stato impiegato per facilitare la comunicazione tra le varie classi, concentrandomi principalmente sui controller, in particolare AlimentoController e OrdineController. Questa scelta ha permesso una divisione chiara dei compiti tra i due controllori, promuovendo una migliore separazione delle responsabilità. Il Mediator ha agevolato la gestione delle interazioni tra le diverse classi, rendendo il sistema più flessibile e scalabile.

### State

Il pattern **State** è stato adottato per gestire efficacemente i diversi stati di un ordine all'interno del sistema. Invece di concentrare tutte le responsabilità nella classe OrdineModel, ho suddiviso la gestione degli stati in quattro classi distinte, ognuna rappresentante uno degli stati possibili di un ordine. Questo approccio ha migliorato la coesione e la manutenibilità del codice, permettendo al sistema di reagire in modo differenziato alle richieste del controller a seconda dello stato attuale dell'ordine.

In conclusione, l'utilizzo combinato dei pattern Mediator e State ha notevolmente contribuito all'organizzazione e alla chiarezza del codice. Questa scelta di design ha facilitato l'espansione futura del sistema e ha garantito una gestione efficiente delle interazioni e degli stati nel contesto delle operazioni di prelievo degli alimenti.

## Test del progetto con Postman


### 1- Rotta **Creazione alimento** di tipo **POST**, **localhost:3000/alimenti/add**

<img src="./immagini/test-Postman/creazioneAlimento.png" alt="classi"   >

<img src="./immagini/test-Postman/creazioneAlimentoConDisp.png" alt="classi"  >



### 2- Rotta **Modifica alimento** di tipo **PATCH**, **localhost:3000/alimenti/modiifica/:id**

<img src="./immagini/test-Postman/modificaAlimento.png" alt="classi"   >

**- id alimento non valido**


<img src="./immagini/test-Postman/modificaAlimentoIDNonValido.png" alt="classi"  >



### 3- Rotta **Operazione Scarico alimento** di tipo **POST**, **localhost:3000/alimenti/scarica**

<img src="./immagini/test-Postman/scaricoAlimenti.png" alt="classi"   >

**- quantità di scarico non valida**

<img src="./immagini/test-Postman/scaricaDispoNonValida.png" alt="classi"  >

**- id alimento non valido**


<img src="./immagini/test-Postman/scaricaIDNonValido.png" alt="classi"  >


### 4- Rotta **Creazione nuovo Ordine** di tipo **POST**, **localhost:3000/ordini/crea**

<img src="./immagini/test-Postman/creazioneOrdine.png" alt="classi"   >

**- L'utente ha inseristo due alimenti con la stessa sequenza di carico**

<img src="./immagini/test-Postman/creazioneOrdineStessaSequenzaDiCarico.png" alt="classi"  >

**- L'utente ha inserito un alimento due volte**


<img src="./immagini/test-Postman/creazioneOrdineAlimentoRepetuto.png" alt="classi"  >

**- Alcuni alimenti inseriti non sono disponibili**


<img src="./immagini/test-Postman/creazioneOrdineDispNonSuff.png" alt="classi"  >

**- L'utente ha inserito id Alimenti non validi**


<img src="./immagini/test-Postman/creazioneOrdineIdNonValido.png" alt="classi"  >


### 5- Rotta **Presa In Carico Di Un Ordine** di tipo **POST**, **localhost:3000/ordini/presa-in-carico**

<img src="./immagini/test-Postman/presa.png" alt="classi"   >

**- L'utente ha provato di prendere in carico un ordine che sta già nella fase di ESECUZIONE**

<img src="./immagini/test-Postman/presaEraInEsecuzione.png" alt="classi"  >

**- L'utente ha inserito un Id Ordine non valido**


<img src="./immagini/test-Postman/presaIdNonValido.png" alt="classi"  >

**- L'utente ha provato di prendere in carico un ordine che è stato COMPLETATO**


<img src="./immagini/test-Postman/presaOrdineCompleto.png" alt="classi"  >

**- L'utente ha provato di prendere in carico un ordine FALLITO**


<img src="./immagini/test-Postman/presaOrdineFallito.png" alt="classi"  >


### 6- Rotta **Operazione di Carico Alimento** di tipo **POST**, **localhost:3000/ordini/carica**

<img src="./immagini/test-Postman/caricoAlimenti.png" alt="classi"   >

**- L'utente prova ad effettuare l'operazione di carico di un alimento che non è presente nell'ordine**

<img src="./immagini/test-Postman/caricoAlimentiNonPresente.png" alt="classi"  >

**- L'utente ha inserito un Id Ordine non valido**


<img src="./immagini/test-Postman/caricoAlimentiIdNonValido.png" alt="classi"  >

**- L'utente ha effettuato l'ultima operazione di carico nell'ordine**


<img src="./immagini/test-Postman/caricoAlimentiOrdineCompletato.png" alt="classi"  >

**- L'utente ha provato caricare un alimento di un ordine nello stato CREATO**


<img src="./immagini/test-Postman/caricoAlimentiOrdineCreato.png" alt="classi"  >

**- L'ordine fallisce in quanto l'utente non ha rispettato le sequenze di carico**


<img src="./immagini/test-Postman/caricoAlimentiOrdineFallito.png" alt="classi"  >

**- L'ordine fallisce in quanto l'utente non ha rispettato il margine della quantità caricata**


<img src="./immagini/test-Postman/caricoAlimentiOrdineFallitoTolleranza.png" alt="classi"  >



### 7- Rotta **Visualizzazione stato ordine** di tipo **GET**, **localhost:3000/ordini/stato/:id**
**Stato CREATO**
<img src="./immagini/test-Postman/statoCreato.png" alt="classi"   >


**Stato FALLITO**


<img src="./immagini/test-Postman/statoOrdineFallito.png" alt="classi"  >

**Stato IN ESECUZIONE**


<img src="./immagini/test-Postman/statoEsecuzione.png" alt="classi"  >

**Stato COMPLETATO**


<img src="./immagini/test-Postman/statoCompletato.png" alt="classi"  >



### 8- Rotta **Elenco operazioni di carico e scarico di un dato alimento filtrate per data** di tipo **GET**, **localhost:3000/alimenti/operazioni/:id**


<img src="./immagini/test-Postman/operazioniAlimenti.png" alt="classi"   >


**- L'utente non ha fornito nessuna data**

<img src="./immagini/test-Postman/operazioniAlimentiFallimento.png" alt="classi"  >

**- L'utente ha inserito le date in formato sbagliato**


<img src="./immagini/test-Postman/operazioniAlimentiFormato.png" alt="classi"  >

**- L'utente ha inserito unan dataFine precedente alla dataInizio**


<img src="./immagini/test-Postman/operazioniAlimentiPrecedenza.png" alt="classi"  >


### 8- Rotta **Elenco stati ordini filtrati: da una data ad un'altra , a partire da una data, fino ad una data di tipo** **GET**, **localhost:3000/alimenti/stati/filter**

**- Filtraggio da una data fino ad un'altra**
<img src="./immagini/test-Postman/statiOridiniFromTO.png" alt="classi"   >


**- Filtraggio a partire da una data**

<img src="./immagini/test-Postman/statiOridniFrom.png" alt="classi"  >

**- Filtraggio fino ad una data**


<img src="./immagini/test-Postman/statiOrdiniUntil.png" alt="classi"  >

## Istruzioni di Installazione
1. **Clone repository.**
2. **Build delle Immagini Docker:**

     ```bash
     docker-compose build
     ```
4. **Avvio del Progetto:**
   
     ```bash
     docker-compose up
     ```

5. **Accesso al Progetto:**
   - Una volta avviato, il progetto sarà accessibile all'indirizzo`http://localhost:3000`.

   