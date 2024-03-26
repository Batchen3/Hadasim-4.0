var http = require('http');
var express = require("express");
var app = express();
var cors = require("cors");
var client = require("./routers/client")
var vaccine = require("./routers/vaccine")
var covid19 = require("./routers/covid19")
var city = require("./routers/city")
const host = "localhost";
const port = 8000;
process.env.TZ = 'Asia/Jerusalem';

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.use(cors());
app.use("/api/city", city)
app.use("/api/client", client)
app.use("/api/vaccine", vaccine)
app.use("/api/covid19", covid19)


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    console.log(new Date())
    console.log(process.env.TZ)
});