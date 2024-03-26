var db = require("../db")


var allCities = async() => {
    var result = await db("select cityName from my_db.city;");
    return result;
}

module.exports = {
    allCities
}