const Sequelize = require("sequelize");
const tedious = require("tedious");
const config = require("../config.json");

let connect = function() {
    console.log("Config:" + config);
    let sequelize = new Sequelize(config.database, config.username, config.password, {
        dialect: "mssql",
        host: config.host,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    sequelize.authenticate().then(() => {
        console.log("Connecting Made");
    }).catch((err) => {
        console.error(err);
    });
    return sequelize;
}
module.exports = {
    connect
}