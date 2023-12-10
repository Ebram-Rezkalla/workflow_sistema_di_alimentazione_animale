import { Sequelize, Model, DataTypes, Op } from 'sequelize';

import Alimento from "../db/alimento.js";
import sequelize from './connessioneSequelize.js';



//definisco la tabella scaricamento per slavare ogni operazione di scaricamento relativa ad un dato alimento
const Scaricamento= sequelize.define('Scaricamento',{
  
  id_alimento: {
    type: DataTypes.INTEGER,
    references: {
        model: Alimento, 
        key: 'id'
      },
    allowNull: false,
},
  quantità_scaricata: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  data:{
    type:DataTypes.DATEONLY,
    allowNull: false 
  }
 }, {
  freezeTableName: true,
  timestamps: false,  
}); 

 //Alimento.hasMany(Scaricamento)
//Scaricamento.belongsToMany(Alimento,{ through: 'Scaricamento' })

//await Scaricamento.sync({ force: true });
    

export default Scaricamento;

