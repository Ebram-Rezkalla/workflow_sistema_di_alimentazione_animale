import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';
import StatoOrdine from '../models/StatoOrdine.js';



//defenisco la tabella Ordine 
const Ordine= sequelize.define('Ordine',{
  stato: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: StatoOrdine.Creato  // Imposto il valore predefinito a CREATO

  },
  data_creazione:{
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
  }, {
    freezeTableName: true, 
    timestamps: false,  
  }); 

//await Ordine.sync({ force: true });
    

export default Ordine;

