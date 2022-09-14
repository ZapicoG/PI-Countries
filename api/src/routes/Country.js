const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Op } = require("sequelize")
const router = Router();

const axios = require("axios");


module.exports = router;


const validateCountry = (obj) => {
    let res = true;
    if (obj.cca3 === null || obj.cca3 === undefined)   res = false;
    if (obj.name.common === null || obj.name.common === undefined)   res = false;
    if (obj.flags === null || obj.flags === undefined)   res = false;
    if (obj.continents === null || obj.continents === undefined)   res = false;
    if (obj.capital === null || obj.capital === undefined)   res = false;
    return res;
}

const getCountriesApi = async () => {
    const url = await axios.get("https://restcountries.com/v3/all");
    const infoUtil = []
    for (let e of url.data) {
        if (!validateCountry(e)) continue
        let country = {
            ID: e.cca3,
            name: e.name.common,
            flag: e.flags[1],
            continent: e.continents[0],
            capital: e.capital[0],
            subregion: e.subregion,
            area: e.area,
            population: e.population
        };
        infoUtil.push(country);
    };
    return infoUtil
};



router.get("/", async (req, res) => {
    let { name } = req.query;
    let countries = await Country.findAll();
    if (countries == 0) countries = await Country.bulkCreate(await getCountriesApi())
    countries = await Country.findAll({include: {model: Activity, through: { attributes: []}}});
    if (!name) return res.json(countries);
    let country = await Country.findAll({
        include: {
            model: Activity,
            through: { attributes: []}    
        },
        where:{
            name: {
                [Op.iLike]: `%${name}%`
        }
        }})
    // console.log(country)
    if (country == 0) return res.send("No se encontro ningun pais")
    res.json(country)
})

router.get("/:ID", async (req, res) => {
    let { ID } = req.params;
    let country;
    if (ID) {
    country = await Country.findByPk(ID, {include: {model: Activity, through: { attributes: []}}});
    }
    if (country) return res.json(country)
    // console.log(country)
    res.status(404).send("La ID no existe en la base de datos")
})


