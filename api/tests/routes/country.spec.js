/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app.js');
const { conn, Country } = require('../../src/db.js');


describe('Country Routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  })

 

  describe('Multiple routes', () => {
    beforeAll(async () => {
      const p1Country = Country.create({ID: "AAA", name: "prueba1", flag: "prueba1", area: "prueba1", continent: "prueba1", capital: "prueba1"});
      const p2Country = Country.create({ID: "AAB", name: "prueba2", flag: "prueba2", area: "prueba2", continent: "prueba2", capital: "prueba2"});
      const p3Country = Country.create({ID: "AAC", name: "prueba3", flag: "prueba3", area: "prueba3", continent: "prueba3", capital: "prueba3"});
      const [p1, p2, p3] = await Promise.all([p1Country, p2Country, p3Country]);
      // await Promise.all([
      //   p1.createActivity({name: "Kayak", difficulty: 1, length: 14, season: "Primavera"}),
      //   p1.createActivity({name: "Rafting", difficulty: 1, length: 14, season: "Primavera"}),
      //   p2.createActivity({name: "Bowling", difficulty: 1, length: 14, season: "Primavera"}),
      //   p3.createActivity({name: "Running", difficulty: 1, length: 14, season: "Primavera"}),
      //   p3.createActivity({name: "Fishing", difficulty: 1, length: 14, season: "Primavera"})
      // ]);
    })

    describe('Parte UNO', () => {
      it('should return status 200 and the list of all countries', async () => {
        const res = await request(app).get('/countries');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          {ID: "AAB", name: "prueba2", flag: "prueba2", area: "prueba2", continent: "prueba2", capital: "prueba2", population: null, subregion: null, activities: []},
          {ID: "AAA", name: "prueba1", flag: "prueba1", area: "prueba1", continent: "prueba1", capital: "prueba1", population: null, subregion: null, activities: []},
          {ID: "AAC", name: "prueba3", flag: "prueba3", area: "prueba3", continent: "prueba3", capital: "prueba3", population: null, subregion: null, activities: []}
        ])
      })
  
      it('should return status 200 and the list of all countries filtered by name', async () => {
        const res = await request(app).get('/countries?name=prueba');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          {ID: "AAA", name: "prueba1", flag: "prueba1", area: "prueba1", continent: "prueba1", capital: "prueba1", population: null, subregion: null, activities: []},
          {ID: "AAB", name: "prueba2", flag: "prueba2", area: "prueba2", continent: "prueba2", capital: "prueba2", population: null, subregion: null, activities: []},
          {ID: "AAC", name: "prueba3", flag: "prueba3", area: "prueba3", continent: "prueba3", capital: "prueba3", population: null, subregion: null, activities: []}
        ])
      })
  

  
      it('should return status 404 and the correct message if country\'s code is invalid', async () => {
        const res = await request(app).get('/countries/ABC');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('La ID no existe en la base de datos');
      })
  
      it('should return the correct country search by code', async () => {
        const res = await request(app).get('/countries/AAA');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          {ID: "AAA", name: "prueba1", flag: "prueba1", area: "prueba1", continent: "prueba1", capital: "prueba1", population: null, subregion: null, activities: []}
        )
      })
    })
   
    afterAll(async () => {
      await conn.sync({ force: true });
    })
  })

  afterAll(() => {
    conn.close();
  })
})


