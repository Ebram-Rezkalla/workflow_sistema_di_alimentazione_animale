import { Sequelize, Model, DataTypes, Op } from 'sequelize';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'alimentazione.sqlite'
}); //conessione al db

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

const Scaricamento= sequelize.define('Scaricamento',{
  quantità_scaricata: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
 }, {freezeTableName: true }); 

 Alimento.hasMany(Scaricamento,{foreignKeyConstraint:true,foreignKey:"id",sourceKey:"id"})
 Scaricamento.belongsTo(Alimento,{foreignKey:"id",targetKey:"id"})

await Alimento.sync({ force: true });
    

export default Alimento;Scaricamento

