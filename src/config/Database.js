import { Sequelize } from "sequelize";

const DB_NAME = "padicare_db";
const DB_PASSWORD = "";
const DB_USERNAME = "root";

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

export default db;
