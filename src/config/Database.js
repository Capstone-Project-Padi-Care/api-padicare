import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;

const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default db;
