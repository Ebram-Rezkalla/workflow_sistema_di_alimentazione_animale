import { JSONSchema7} from 'json-schema';
//definizione schema per la validazione delle richiesta da parte del utente
const caricoSchema : JSONSchema7 = {
    type: 'object',
    required: ['id','idAlimento', 'quantità_caricata'],
    properties: {
      id: {
        type: 'integer',
      },
      idAlimento: {
        type: 'integer',
      },
      quantità_caricata: {
        type: 'number',
        minimum:0.1
      },
      
    },
  };

  export default caricoSchema;