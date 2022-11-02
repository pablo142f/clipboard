const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require("./employee/employee.model")(sequelize, Sequelize);

module.exports = db;