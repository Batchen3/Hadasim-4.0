var express = require("express");
var router = express.Router();
var client = require("../services/client")

const checking = (body) => {
    const regexForID = /^\d{9}$/;
    const regexForPhone = /^\d{9,10}$/;
    if (Object.keys(body).length === 0)
        return false
    if (!(regexForID.test(body.idClient) && body.idClient.length === 9))
        return false
    if (body.clientFirstName == "" || body.clientLastName == "" || body.address == "" || body.cityName == "" || body.telephone == "" || body.mobilePhone == "")
        return false
    if (body.telephone.length < 9 || body.telephone.length > 10 || !regexForPhone.test(body.telephone) || body.mobilePhone.length < 9 || body.mobilePhone.length > 10 || !regexForPhone.test(body.mobilePhone))
        return false
    return true
}

router.get("/allClients", async(req, res, next) => {
    try {
        let result = await client.allClients()
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async function(req, res, next) {
    if (checking(req.body))
        try {
            let result = await client.createClient(req.body.idClient, req.body.clientFirstName, req.body.clientLastName, req.body.cityName, req.body.address, req.body.dateBirth, req.body.telephone, req.body.mobilePhone);
            res.json(result);
        } catch (err) {
            console.error(`Error`, err.message);
            next(err);
        }
    else
        res.json("Error - details of client incorrect");
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
    if (checking(req.body))
        try {
            let result = await client.updateClient(req.body.idClient, req.body.clientFirstName, req.body.clientLastName, req.body.cityName, req.body.address, req.body.dateBirth, req.body.telephone, req.body.mobilePhone);
            res.json(result);
        } catch (err) {
            console.error(`Error`, err.message);
            next(err);
        }
    else
        res.json("Error - details of client incorrect");
});


module.exports = router;