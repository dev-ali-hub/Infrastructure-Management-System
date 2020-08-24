const Sequelize = require("sequelize");
const sequelize = require("../handlers/dbHandler").connect();
const format = require("date-fns/format");
const getHour = require("date-fns/get_hours");
const getMinutes = require("date-fns/get_minutes");
const getSeconds = require("date-fns/get_seconds");
const Power = sequelize.define("SOURCE", {
    SOURCE: {
        type: Sequelize.STRING
    },

    PHASE1: {
        type: Sequelize.STRING
    },
    PHASE2: {
        type: Sequelize.STRING
    },
    PHASE3: {
        type: Sequelize.STRING
    },
    UPS: {
        type: Sequelize.STRING
    },
    FLOOR: {
        type: Sequelize.STRING
    },
    TEMPERATURE: {
        type: Sequelize.STRING
    },
    HUMIDITY: {
        type: Sequelize.INTEGER
    },
    DATE: {
        type: Sequelize.DATEONLY,
        get: function() {
            console.log("DATE=" + this.getDataValue('DATE'));
            var date = new Date(this.getDataValue('DATE'));
            var result = format(date, "DD/MM/YYYY");
            console.log("DATE2" + result);
            return result;
        }
    },
    TIME: {
        type: Sequelize.TIME,
        get: function() {
            console.log("DATE=" + this.getDataValue('TIME'));
            var date = new Date(this.getDataValue('TIME'));
            var hours = getHour(date);
            var minutes = getMinutes(date);
            var seconds = getSeconds(date);
            var time = hours + ":" + minutes + ":" + seconds;
            console.log("time=" + time);
            return time;
        },
    
    }


}, { timestamps: false, freezeTableName:true,tableName:"SOURCE" });

Power.sync({ force: false }).then(() => {
    console.log("Table");
});
Power.removeAttribute("id");
module.exports = {
    Power
}