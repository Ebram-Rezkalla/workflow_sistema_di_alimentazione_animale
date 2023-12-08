import { Sequelize, Model, DataTypes, Op } from 'sequelize';

import Alimento from "../db/alimento.js";
import sequelize from './connessioneSequelize.js';



//definisco la tabella scaricamento per slavare ogni operazione di scaricamento relativa ad un dato alimento
const Scaricamento= sequelize.define('Scaricamento',{
  quantità_scaricata: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
 }, {freezeTableName: true }); 

 Alimento.hasMany(Scaricamento,{foreignKeyConstraint:true,foreignKey:"id",sourceKey:"id"})
 Scaricamento.belongsTo(Alimento,{foreignKey:"id",targetKey:"id"})

await Scaricamento.sync({ force: true });
    

export default Scaricamento;

