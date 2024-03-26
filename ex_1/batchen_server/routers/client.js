var express = require("express");
var router = express.Router();
var client = require("../services/client")

router.get("/allClients", async(req, res, next) => {
    try {
        let result = await client.allClients()
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async function(req, res, next) {
    try {
        let result = await client.createClient(req.body.idClient, req.body.clientFirstName, req.body.clientLastName, req.body.cityName, req.body.address, req.body.dateBirth, req.body.telephone, req.body.mobilePhone);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});


router.delete('/deleteClient', async function(req, res, next) {
    try {
        let result = await client.deleteClient(req.body.idClient);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/update', async function(req, res, next) {
    try {
        let result = await client.updateClient(req.body.idClient, req.body.clientFirstName, req.body.clientLastName, req.body.cityName, req.body.address, req.body.dateBirth, req.body.telephone, req.body.mobilePhone);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});


module.exports = router;