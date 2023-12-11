import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';
import Ordine from './ordine.js';
import Alimento from './alimento.js';


//definisco la tabella PresaInCarico per salvare quando è stato preso in carico un ordine
const PresaInCarico= sequelize.define('presaInCarico',{
    data_preaInCarico:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
  }, {
    freezeTableName: true, 
    timestamps: false, 
     
  }); 


  Ordine.hasOne(PresaInCarico,{foreignKey:'OrdineId'})
  PresaInCarico.belongsTo(Ordine)

  export default PresaInCarico;
