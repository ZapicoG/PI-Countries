const { Router } = require('express');
const { Activity, Country } = require('../db');
const router = Router();

module.exports = router;


router.get("/", async (req, res) => {
    let activities = await Activity.findAll();
    res.json(activities);
})

router.post("/", async (req, res) => {
    let { name, difficulty, length, season, countries } = req.body;
    // console.log(req.body)
    try {   
        let activity = await Activity.create({name, difficulty, length, season});
        if (!countries) return res.send("Activity added")
        for (let cName of countries) {
            let country = await Country.findOne({
                where: {name : cName}
            })
            await country.addActivity(activity)
        }
        res.send(activity)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post("/addCountry", async (req, res) => {
    let { id, countries } = req.body;
    let activity = await Activity.findByPk(id)
    try {
        countries.map(async c => {
            let country = await Country.findOne({
                where: {name: c}
            })
            await country.addActivity(activity)
        })
        console.log("Paises agregados correctamente a la actividad")
        res.send()
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})