import { JSONSchema7} from 'json-schema';
//definizione schema per la validazione delle richiesta da parte del utente
const alimentoSchema : JSONSchema7 = {
    type: 'object',
    required: ['nome', 'disponibilità'],
    properties: {
      nome: {
        type: 'string',
      },
      disponibilità: {
        type: 'number',
      },
      
    },
  };

  export default alimentoSchema;