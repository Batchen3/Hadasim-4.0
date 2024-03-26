var db = require("../db")


var getVaccineByID = async(id) => {
    var result = await db(`SELECT idVaccines, vaccineDate, vaccineManufacturerName FROM my_db.vaccines,my_db.vaccinemanufacturer WHERE my_db.vaccines.idClient = "${id}" AND my_db.vaccines.idVaccineManufacturer = my_db.vaccinemanufacturer.idVaccineManufacturer;`);
    return result;
}

var getManufacturers = async() => {
    var result = await db(`SELECT vaccineManufacturerName FROM my_db.vaccinemanufacturer;`);
    return result;
}

var createVaccine = async(idClient, vaccineDate, vaccineManufacturerName) => {
    let idVaccineManufacturer = await db(`SELECT idVaccineManufacturer from my_db.vaccinemanufacturer where vaccinemanufacturer.vaccineManufacturerName="${vaccineManufacturerName}";`);
    var result = await db(`INSERT INTO my_db.vaccines VALUES(default, "${idClient}", "${vaccineDate}", "${idVaccineManufacturer[0].idVaccineManufacturer}");`);
    return result;
}

async function updateVaccine(idVaccines, vaccineDate, vaccineManufacturerName) {
    let idVaccineManufacturer = await db(`SELECT idVaccineManufacturer from my_db.vaccinemanufacturer where vaccinemanufacturer.vaccineManufacturerName="${vaccineManufacturerName}";`);
    let result = await db(`update my_db.vaccines set vaccines.vaccineDate="${vaccineDate}", vaccines.idVaccineManufacturer="${idVaccineManufacturer[0].idVaccineManufacturer}" where vaccines.idVaccines="${idVaccines}";`);
    return result;
}
async function deleteVaccine(idVaccines) {
    await db(`delete FROM my_db.vaccines where vaccines.idVaccines="${idVaccines}";`)
}
module.exports = {
    getVaccineByID,
    getManufacturers,
    createVaccine,
    updateVaccine,
    deleteVaccine
}