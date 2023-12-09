import { JSONSchema7} from 'json-schema';
//definizione schema per la validazione delle richiesta da parte del utente
const ordineSchema : JSONSchema7 = {
  type: "array",
  items: {
    type: "object",
    properties: {
      idAlimento: {
        type: "integer",
        minimum:0,
      },
      quantità_richiesta: {
        type: "number",
        minimum:0.1
      },
      sequenza: {
        type: "integer",
        minimum:0
      }
    },
    required: [
      "idAlimento",
      "quantità_richiesta",
      "sequenza"
    ],
  }
}

  export default ordineSchema;