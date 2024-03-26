var db = require("../db")


var allClients = async() => {
    var result = await db("select * from my_db.client,my_db.city where client.idCity=city.idCity;");
    return result;
}

async function createClient(idClient, clientFirstName, clientLastName, cityName, address, dateBirth, telephone, mobilePhone) {
    let idCity = await db(`SELECT idCity from my_db.city where city.cityName="${cityName}";`);
    let result = await db(`INSERT INTO my_db.client VALUES ("${idClient}", "${clientFirstName}", "${clientLastName}","${dateBirth}","${idCity[0].idCity}", "${address}","${telephone}","${mobilePhone}");`);
    return result;
}

async function deleteClient(idClient) {
    await db(`delete FROM my_db.vaccines where vaccines.idClient="${idClient}";`)
    await db(`delete FROM my_db.covid19 where covid19.idClient="${idClient}";`)
    await db(`delete FROM my_db.client where client.idClient="${idClient}";`)
}

async function updateClient(idClient, clientFirstName, clientLastName, cityName, address, dateBirth, telephone, mobilePhone) {
    let idCity = await db(`SELECT idCity from my_db.city where city.cityName="${cityName}";`);
    let result = await db(`update my_db.client set client.clientFirstName="${clientFirstName}", client.clientLastName="${clientLastName}",client.dateBirth="${dateBirth}",client.idCity="${idCity[0].idCity}", client.address="${address}",client.telephone="${telephone}",client.telephone="${telephone}" where client.idClient="${idClient}";`);
    return result;
}

module.exports = {
    allClients,
    createClient,
    deleteClient,
    updateClient
}