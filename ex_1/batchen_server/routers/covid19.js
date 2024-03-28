var express = require("express");
var router = express.Router();
var covid19 = require("../services/covid19")

const checking = (body) => {
    if (body.dateStart == "" || body.dateEnd == "")
        return false
    return true
}

router.post('/add', async function(req, res, next) {
    if (checking(req.body))
        try {
            let result = await covid19.createCovid19(req.body.idClient, req.body.dateStart, req.body.dateEnd);
            res.json(result);
        } catch (err) {
            console.error(`Error`, err.message);
            next(err);
        }
    else
        res.json("Error - details of covid-19 incorrect");
});

router.get("/:id", async(req, res, next) => {
    try {
        var id = req.params.id;
        let result = await covid19.getCovid19ByID(id)
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/update', async function(req, res, next) {
    try {
        let covid19User = await covid19.getCovid19ByID(req.body.idClient)
        let result;
        if (covid19User.length == 0)
            if (checking(req.body))
                result = await covid19.createCovid19(req.body.idClient, req.body.dateStart, req.body.dateEnd)
            else
                result = "Error - details of covid-19 incorrect";
        else {
            result = await covid19.updateCovid(req.body.idClient, req.body.dateStart, req.body.dateEnd);
        }
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;