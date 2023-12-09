import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';



//defenisco la tabella ALimento difenedo i parametri 
const Ordine= sequelize.define('Ordine',{
  stato: {
    type: DataTypes.STRING,
    allowNull: false
  },
  }, {freezeTableName: true }); 

await Ordine.sync({ force: true });
    

export default Ordine;

