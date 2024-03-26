var db = require("../db")

var getCovid19ByID = async(id) => {
    var result = await db(`SELECT * FROM my_db.covid19 WHERE my_db.covid19.idClient=${id};`);
    return result;
}
var createCovid19 = async(idClient, dateStart, dateEnd) => {
    var result = await db(`INSERT INTO my_db.covid19 VALUES(default, "${idClient}", "${dateStart}", "${dateEnd}");`);
    return result;
}

async function updateCovid(idClient, dateStart, dateEnd) {
    let result = await db(`update my_db.covid19 set covid19.dateStart="${dateStart}", covid19.dateEnd="${dateEnd}" where covid19.idClient="${idClient}";`);
    return result;
}

module.exports = {
    getCovid19ByID,
    createCovid19,
    updateCovid
}