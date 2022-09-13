const { conn, Country } = require('../../src/db.js');


describe('Country Model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('DB reset');
  });

  describe('Parte UNO', () => {
    it('should not create the Country if ID is not send', async () => {
      expect.assertions(1);
      try {
        await Country.create({name: "prueba", flag: "prueba", continent: "prueba", capital: "prueba"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the Country if name is not send', async () => {
      expect.assertions(1);
      try {
        await Country.create({ID: "ABC", flag: "prueba", continent: "prueba", capital: "prueba"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should not create the Country if flag is not send', async () => {
      expect.assertions(1);
      try {
        await Country.create({ID: "ABC", name: "prueba", continent: "prueba", capital: "prueba"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should not create the Country if continent is not send', async () => {
      expect.assertions(1);
      try {
        await Country.create({ID: "ABC", name: "prueba", flag: "prueba", capital: "prueba"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
    
    it('should not create the Country if capital is not send', async () => {
      expect.assertions(1);
      try {
        await Country.create({ID: "ABC", name: "prueba", flag: "prueba", continent: "prueba"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should not create the Country if ID is more than 5 chars', async () => {
      expect.assertions(1);
      try {
        await Country.create({ID: "ABCDE", name: "prueba", flag: "prueba", continent: "prueba", capital: "prueba"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should create the Country if all required properties are ok', async () => {
      // Lógica para generar un ISO string con la hora local en vez de UTC
      
      const country = await Country.create({
        ID: "ABB",
        name: "prueba",
        flag: "prueba",
        area: "prueba",
        continent: "prueba",
        capital: "prueba"})
      
      expect(country.toJSON()).toEqual({
        ID: "ABB",
        name: "prueba",
        flag: "prueba",
        area: "prueba",
        continent: "prueba",
        capital: "prueba",
        population: null,
        subregion: null
      });
    });
  
    it('should not create two Countrys with the same name', async () => {
      expect.assertions(2);
      try {


        const CountryOne = await Country.create({ID: "ABC", name: "prueba", flag: "prueba", area: "prueba", continent: "prueba", capital: "prueba"})
        expect(CountryOne.toJSON()).toEqual({
          ID: "ABC",
          name: "prueba",
          flag: "prueba",
          area: "prueba",
          continent: "prueba",
          capital: "prueba",
          population: null,
          subregion: null
        });
        const CountryTwo = await Country.create({ID: "ABC", name: "prueba2", flag: "prueba2", area: "prueba2", continent: "prueba2", capital: "prueba2"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});
