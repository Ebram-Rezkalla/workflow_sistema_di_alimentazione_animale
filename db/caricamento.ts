import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';
import Ordine from './ordine.js';
import Alimento from './alimento.js';



//defenisco la tabella Caricamento che avrà i caricamenti di ogni alimento relativo a ogni ordine 
const Caricamento= sequelize.define('Caricamento',{
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
    quantità_caricata: {
    type: DataTypes.DOUBLE,
    allowNull: false
     },
    data_caricamento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  }, {
    freezeTableName: true, 
    timestamps: false, 
     
  }); 

//await dettagliOrdine.sync({ force: true });
    
Ordine.belongsToMany(Alimento,{through: Caricamento})
Alimento.belongsToMany(Ordine,{through: Caricamento})

export default Caricamento;

