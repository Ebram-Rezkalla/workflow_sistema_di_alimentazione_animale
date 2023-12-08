import { JSONSchema7} from 'json-schema';
//definizione schema per la validazione delle richiesta da parte del utente
const scaricoSchema : JSONSchema7 = {
    type: 'object',
    required: ['id', 'quantità'],
    properties: {
      id: {
        type: 'number',
      },
      quantità: {
        type: 'number',
        minimum:0.1
      },
      
    },
  };

  export default scaricoSchema;