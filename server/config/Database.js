import {Sequelize} from "sequelize";

const db = new Sequelize('rfid', 'root', 'ifrn.cn', {
    host: "localhost",
    dialect: "mysql"
});

export default db;