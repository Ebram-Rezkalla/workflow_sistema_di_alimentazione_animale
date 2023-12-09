import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import sequelize from './connessioneSequelize.js';
import Ordine from './ordine.js';
import Alimento from './alimento.js';



//defenisco la tabella ALimento difenedo i parametri 
const dettagliOrdine= sequelize.define('dettagliOrdine',{
    OrdineId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ordine, 
            key: 'id'
          },
        allowNull: false
    },
    AlimentoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Alimento, 
            key: 'id'
          },
        allowNull: false
    },
    quantità_desiderata: {
    type: DataTypes.DOUBLE,
    allowNull: false
     },
    sequenza: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  caricato: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  }, {freezeTableName: true }); 

await dettagliOrdine.sync({ force: true });
    
Ordine.belongsToMany(Alimento,{through: dettagliOrdine})
Alimento.belongsToMany(Ordine,{through: dettagliOrdine})

export default dettagliOrdine;

