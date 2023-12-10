import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';
import Ordine from './ordine.js';
import Alimento from './alimento.js';



//defenisco la tabella dettagliOrdine che avrà gli alimenti contenuti in un ordine
const dettagliOrdine= sequelize.define('dettagliOrdine',{
    OrdineId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ordine, 
            key: 'id',
          },
        allowNull: false,
    },
    AlimentoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Alimento, 
            key: 'id'
          },
        allowNull: false,
    },
    quantità_richiesta: {
    type: DataTypes.DOUBLE,
    allowNull: false
     },
    sequenza: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  caricato: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false  // Imposto il valore predefinito a 0
  },
  }, {
    freezeTableName: true, 
    timestamps: false, 
     
  }); 

//await dettagliOrdine.sync({ force: true });
    
Ordine.belongsToMany(Alimento,{through: dettagliOrdine})
Alimento.belongsToMany(Ordine,{through: dettagliOrdine})

export default dettagliOrdine;

