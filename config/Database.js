import { Sequelize } from "sequelize";

const db = new Sequelize("rfid", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
