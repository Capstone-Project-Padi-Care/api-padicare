import { Sequelize } from "sequelize";

const dbName = "padicare_db";
const dbPassword = "";
const dbUsername = "root";
const dbHost = process.env.DB_HOST;

const db = new Sequelize(dbName, dbUsername, "", {
  host: dbHost,
  dialect: "mysql",
});

export default db;
