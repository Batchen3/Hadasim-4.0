var express = require("express");
var router = express.Router();
var vaccine = require("../services/vaccine")

router.get("/manufacturers", async(req, res, next) => {
    try {
        let result = await vaccine.getManufacturers()
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/add', async function(req, res, next) {
    try {
        for (let i = 0; i < req.body.length; i++) {
            {
                if (req.body[i].vaccineDate !== "" && req.body[i].vaccineManufacturerName !== "")
                    await vaccine.createVaccine(req.body[i].idClient, req.body[i].vaccineDate, req.body[i].vaccineManufacturerName)
            }
        }
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.get("/:id", async(req, res, next) => {
    try {
        var id = req.params.id;
        let result = await vaccine.getVaccineByID(id)
        res.json(result);
    } catch (err) {
        next(err);
    }
});
router.put('/update', async function(req, res, next) {
    try {
        let newArray = req.body;
        let oldArray = await vaccine.getVaccineByID(newArray[0].idClient)
        for (const newElement of newArray) {
            let isDelete = false;
            if (newElement.idVaccines !== 0 && newElement.vaccineManufacturerName === "") {
                await vaccine.deleteVaccine(newElement.idVaccines)
                isDelete = true
            }
            let change = false;
            for (const oldElement of oldArray) {
                if (!(isDelete) && newElement.idVaccines === oldElement.idVaccines && (newElement.vaccineDate !== oldElement.vaccineDate || newElement.vaccineManufacturerName !== oldElement.vaccineManufacturerName)) {

                    await vaccine.updateVaccine(newElement.idVaccines, newElement.vaccineDate, newElement.vaccineManufacturerName);
                    change = true;
                }
            }
            if (!change) {
                if (newElement.idVaccines == 0 && newElement.vaccineManufacturerName !== "") {
                    await vaccine.createVaccine(newElement.idClient, newElement.vaccineDate, newElement.vaccineManufacturerName);
                }
            }
        }
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;