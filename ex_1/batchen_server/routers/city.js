var express = require("express");
var router = express.Router();
var city = require("../services/city")


router.get("/allCities", async(req, res, next) => {
    try {
        let result = await city.allCities()
        res.json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;