import { JSONSchema7} from 'json-schema';
//definizione schema per la validazione delle richiesta da parte del utente
const presaInCaricoSchema : JSONSchema7 = {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: "integer",
      }, 
    },
  };

  export default presaInCaricoSchema;