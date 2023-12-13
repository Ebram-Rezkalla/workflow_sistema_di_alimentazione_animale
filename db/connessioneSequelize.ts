import { Sequelize, Model, DataTypes, Op } from 'sequelize';

import 'dotenv/config';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_URL || 'sqlite://:memory:'
}); //conessione al db


sequelize.sync({ force: true })

export default sequelize;

