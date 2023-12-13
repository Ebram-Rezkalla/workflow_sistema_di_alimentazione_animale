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
 ![diagramma-ER-](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/f06fccf1-b931-46b4-b396-a33bd32ff463)

### Analisi dei Requisiti
![analisi-requisiti](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/399f6545-f499-4570-bcde-1b28942808c9)

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
![UC-attori](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/82f818dd-0362-400c-8c07-72913dc885d5)

#### Sistema
![UC-Sistema](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/6089e601-02e2-4d2a-b651-994d8047fe25)

#### 2. Diagramma delle classi

![diagramma-delle-classi](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/fb7519ea-1064-4ce0-9e76-f3c03141feeb)

#### 3. Diagrammi di sequenza
![sequenza-crudAlimento](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/24d55904-6b04-4e9c-be7b-0267f377036b)

![sequenza-c-ordine](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/1578f3c6-3e8a-42bc-92e5-ef5890c8ddeb)
![sequenza-presaInCarico](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/61e2e096-5543-4bf0-974b-4f7f1fc3ebca)
![sequenza-CaricamentoAlimento](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/c39ab719-5fbc-4f38-9bfb-39e8f410f746)

![sequenza-ElencoStatoOrdini](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/a5f21f74-8217-4564-a133-515d126a3c76)


![sequenza-ElencoOperazioniDiUnAlimento](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/92015ebd-de77-4cf1-92be-af3470cadcd0)

![sequenza-StatoOrdine](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/c2799c5e-f04e-4b8c-947a-8d7f0791b2de)

![sequenza-RicercaAlimento](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/6f6739bd-ac76-4bb5-aca0-0d4f090f198e)

![sequenza-RicercaOrdine](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/a44ede4c-0c4f-4199-b89d-c6fac9b41e19)

![AggiornamentoStatoOrdine](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/d3c297c6-0350-474a-a0ff-f66cdd8319c4)

![sequenza-TrovaCaricamenti](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/358ae179-ccf8-46c9-b93d-19fb9f548896)
![sequenza-TrovaScaricamenti](https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/ac9d19d0-3aba-46ae-b741-901da8b47eb3)


## Pattern di Progettazione Utilizzati

Nell'implementazione di questo progetto, ho fatto un'attenta scelta dei pattern di progettazione per garantire una struttura chiara e manutenibile. In particolare, ho utilizzato due pattern chiave: il pattern **Mediator** e il pattern **State**.

### Mediator

Il pattern **Mediator** è stato impiegato per facilitare la comunicazione tra le varie classi, concentrandomi principalmente sui controller, in particolare AlimentoController e OrdineController. Questa scelta ha permesso una divisione chiara dei compiti tra i due controllori, promuovendo una migliore separazione delle responsabilità. Il Mediator ha agevolato la gestione delle interazioni tra le diverse classi, rendendo il sistema più flessibile e scalabile.

### State

Il pattern **State** è stato adottato per gestire efficacemente i diversi stati di un ordine all'interno del sistema. Invece di concentrare tutte le responsabilità nella classe OrdineModel, ho suddiviso la gestione degli stati in quattro classi distinte, ognuna rappresentante uno degli stati possibili di un ordine. Questo approccio ha migliorato la coesione e la manutenibilità del codice, permettendo al sistema di reagire in modo differenziato alle richieste del controller a seconda dello stato attuale dell'ordine.

In conclusione, l'utilizzo combinato dei pattern Mediator e State ha notevolmente contribuito all'organizzazione e alla chiarezza del codice. Questa scelta di design ha facilitato l'espansione futura del sistema e ha garantito una gestione efficiente delle interazioni e degli stati nel contesto delle operazioni di prelievo degli alimenti.

## Test del progetto con Postman


### 1- Rotta **Creazione alimento** di tipo **POST**, **localhost:3000/alimenti/add**

<img width="961" alt="creazioneAlimento" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/83f327c2-5519-4a1c-a6fc-88369216ed1b">

<img width="959" alt="creazioneAlimentoConDisp" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/dd5abdb7-8c89-4efe-a77a-5e3bb7e53c75">


### 2- Rotta **Modifica alimento** di tipo **PATCH**, **localhost:3000/alimenti/modiifica/:id**

<img width="956" alt="modificaAlimento" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/525645ca-2393-46ea-bd5f-a99aa1571966">

**- id alimento non valido**

<img width="964" alt="modificaAlimentoIdNonValido" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/58b18de3-e265-4a1c-90d0-938cde2924bb">

### 3- Rotta **Operazione Scarico alimento** di tipo **POST**, **localhost:3000/alimenti/scarica**
<img width="963" alt="scaricoAlimenti" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/4f0d92bd-d023-4d60-9864-727d417eb736">

s
**- quantità di scarico non valida**
<img width="957" alt="scaricaDispoNonValida" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/de60432b-bb3a-462c-b985-2284ce6df0c6">

**- id alimento non valido**

<img width="958" alt="scaricaIDNonValido" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/1788775c-9952-421f-af7c-564729a67d03">

### 4- Rotta **Creazione nuovo Ordine** di tipo **POST**, **localhost:3000/ordini/crea**

<img width="962" alt="creazioneOrdine" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/96091ed6-14b9-4620-9d8d-981058340a14">

**- L'utente ha inseristo due alimenti con la stessa sequenza di carico**

<img width="959" alt="creazioneOrdineStessaSequenzaDiCarico" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/b470ce28-794b-49d8-81f5-e9c45b5a3da1">

**- L'utente ha inserito un alimento due volte**

<img width="958" alt="creazioneOrdineAlimentoRepetuto" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/ef03f870-07ae-4abe-b0e6-0d19576caf45">

**- Alcuni alimenti inseriti non sono disponibili**

<img width="959" alt="creazioneOrdineDispNonSuff" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/24a40068-a61d-4b9a-bfbd-0a28f0ab2927">

**- L'utente ha inserito id Alimenti non validi**

<img width="964" alt="creazioneOrdineIdNonValido" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/49c7dc93-c3a9-4d52-95ae-2eca3dbb46ff">

### 5- Rotta **Presa In Carico Di Un Ordine** di tipo **POST**, **localhost:3000/ordini/presa-in-carico**

<img width="959" alt="presa" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/45874546-e0d0-461a-8904-c08df1315365">

**- L'utente ha provato di prendere in carico un ordine che sta già nella fase di ESECUZIONE**

<img width="959" alt="presaEraInEsecuzione" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/20f0b196-bb7d-4f6b-b977-54fd46335ad2">

**- L'utente ha inserito un Id Ordine non valido**

<img width="956" alt="presaIdNonValido" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/565d0ad0-8d3e-4e9f-aa95-7614c55e41cf">

**- L'utente ha provato di prendere in carico un ordine che è stato COMPLETATO**

<img width="956" alt="presaOrdineCompleto" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/57e9c918-3b4b-4646-8f46-b5eca96872a9">

**- L'utente ha provato di prendere in carico un ordine FALLITO**
c
<img width="956" alt="presaOrdineFallito" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/d0ca13ad-5d62-441d-9967-130f423551d1">

### 6- Rotta **Operazione di Carico Alimento** di tipo **POST**, **localhost:3000/ordini/carica**

<img width="955" alt="caricoAlimenti" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/33ef3872-fe3a-4a9a-87cd-d8b6679833f1">

**- L'utente prova ad effettuare l'operazione di carico di un alimento che non è presente nell'ordine**

<img width="959" alt="caricoAlimentiNonPresente" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/db77ee5c-21f3-4918-930e-123e145faaf2">

**- L'utente ha inserito un Id Ordine non valido**

<img width="956" alt="caricoAlimentiIdNonValido" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/a5ea173d-ba47-41b0-b6e7-0d59dc2a827d">

**- L'utente ha effettuato l'ultima operazione di carico nell'ordine**

<img width="959" alt="caricoAlimentiOrdineCompletato" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/f36f18c7-05ca-4a7d-8ef1-f7b9a4c557c3">

**- L'utente ha provato caricare un alimento di un ordine nello stato CREATO**

<img width="958" alt="caricoAlimentiOrdineCreato" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/909abbfc-e31d-4b22-aa04-0e32c6c2b774">

**- L'ordine fallisce in quanto l'utente non ha rispettato le sequenze di carico**

<img width="958" alt="caricoAlimentiOrdineFallito" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/654a435d-ceef-4698-b24d-9f8932ba43bd">

**- L'ordine fallisce in quanto l'utente non ha rispettato il margine della quantità caricata**

<img width="958" alt="caricoAlimentiOrdineFallitoTolleranza" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/d0d5ccc9-1449-45e6-bfd8-c4e1938a5be7">


### 7- Rotta **Visualizzazione stato ordine** di tipo **GET**, **localhost:3000/ordini/stato/:id**
**Stato CREATO**

<img width="959" alt="statoCreato" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/c95b9f28-6c14-41fc-981e-03a6ee0df466">

**Stato FALLITO**

<img width="958" alt="statoOrdineFallito" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/d9231802-f72f-494a-a4aa-92c42d470890">

**Stato IN ESECUZIONE**

<img width="959" alt="statoOrdineEsecuzione" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/eae83175-1830-49c6-9c34-2205d738fada">

**Stato COMPLETATO**

<img width="962" alt="statoOrdineCompletato" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/7c97a744-9424-4b03-8af8-c3ae4f00ab01">


### 8- Rotta **Elenco operazioni di carico e scarico di un dato alimento filtrate per data** di tipo **GET**, **localhost:3000/alimenti/operazioni/:id**


<img width="962" alt="operazioniAlimenti" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/5e49aad3-a9e5-4e70-9036-3969480a8c48">

**- L'utente non ha fornito nessuna data**

<img width="959" alt="operazioniAlimentiFallimento" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/a5d91687-f331-4055-a7f1-9a2f6715b065">

**- L'utente ha inserito le date in formato sbagliato**

<img width="959" alt="operazioniAlimentiFormato" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/61c2fe0c-6c5f-4891-802c-6177556fae49">

**- L'utente ha inserito unan dataFine precedente alla dataInizio**

<img width="955" alt="operazioniAlimentiPrecedenza" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/ab12c908-4afd-4834-88b2-abade58ec7d3">

### 8- Rotta **Elenco stati ordini filtrati: da una data ad un'altra , a partire da una data, fino ad una data di tipo** **GET**, **localhost:3000/alimenti/stati/filter**

**- Filtraggio da una data fino ad un'altra**
<img width="958" alt="statiOridiniFromTO" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/1e4906ed-4915-4b5f-8309-8697365bae23">


**- Filtraggio a partire da una data**

<img width="960" alt="statiOridniFrom" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/b21abc5f-a073-434e-8db0-9d77c0accece">

**- Filtraggio fino ad una data**
<img width="962" alt="statiOrdiniUntil" src="https://github.com/Ebram-Rezkalla/workflow_sistema_di_alimentazione_animale/assets/75068172/33399181-e142-4d0b-8293-a8074f248a03">

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

   
