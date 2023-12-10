import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';



//defenisco la tabella ALimento difenendo i parametri 
const Alimento= sequelize.define('Alimento',{
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponibilità: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
  quantità_riservata: {
  type: DataTypes.DOUBLE,
  allowNull: false,
  defaultValue: 0  // Imposto il valore predefinito a 0

  }
}, {
  freezeTableName: true,
  timestamps: false, 
}); 

//await Alimento.sync({ force: true });
    

export default Alimento;

