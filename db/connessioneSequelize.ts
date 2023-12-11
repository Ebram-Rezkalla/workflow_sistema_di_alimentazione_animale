import { Sequelize, Model, DataTypes, Op } from 'sequelize';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'alimentazione.sqlite'
}); //conessione al db


//sequelize.sync({ force: true })
//sequelize.sync({ force: true })
export default sequelize;

