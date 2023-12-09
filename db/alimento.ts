import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';



//defenisco la tabella ALimento difenedo i parametri 
const Alimento= sequelize.define('Alimento',{
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponibilità: {
    type: DataTypes.DOUBLE,
    allowNull: false
}}, {freezeTableName: true }); 

await Alimento.sync({ force: true });
    

export default Alimento;

