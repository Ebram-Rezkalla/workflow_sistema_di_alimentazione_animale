import { JSONSchema7} from 'json-schema';
//definizione schema per la validazione delle richiesta da parte del utente
const modificaAlimentoSchema : JSONSchema7 = {
    type: 'object',
    required: ['nome'],
    properties: {
      nome: {
        type: 'string',
      }, 
    },
  };

  export default modificaAlimentoSchema;