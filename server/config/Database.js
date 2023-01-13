import {Sequelize} from "sequelize";

const db = new Sequelize('rfid', 'root', '0038', {
    host: "localhost",
    dialect: "mysql"
});

export default db;