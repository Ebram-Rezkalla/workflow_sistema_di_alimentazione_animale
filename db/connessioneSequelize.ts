import { Sequelize, Model, DataTypes, Op } from 'sequelize';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'alimentazione.sqlite'
}); //conessione al db


    

export default sequelize;

