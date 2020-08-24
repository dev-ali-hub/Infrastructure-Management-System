//require statements
const express = require("express");
const _ = require("underscore");
const hbs = require("hbs");


//const
const app = express();
const port = process.env.PORT || 3000;
const { Power } = require("./models/Power");

//middleware
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/myjs', express.static(__dirname + "/public/myjs"));
app.use("/css2",express.static(__dirname+"/public/css2"));
app.use(express.static(__dirname + "/public"));
app.use("/", function(req, res, next) {
    console.log("OK");
    next();
});

//routes
app.get("/", function(req, res, next) {
    Power.findAll({
        order: [
            ["date", "DESC"],
            ["time", "DESC"]
        ],
        limit: 1
    }).then((powers) => {
        console.log(powers);
        let power = powers[0];
        res.status(200);
        res.render("index", {
            source: power.SOURCE,
            phase1: power.PHASE1,
            phase2: power.PHASE2,
            phase3: power.PHASE3,
            ups: power.UPS,
            floor: power.FLOOR,
            temperature: power.TEMPERATURE,
            humidity: power.HUMIDITY,
            date: power.DATE,
            time: power.TIME
        });
    }).catch((err) => {
        console.error(err);
        res.status(400);
        res.send(err);
    });
});


app.listen(port, function() {
    console.log("App Is Running On Port:" + port);
});