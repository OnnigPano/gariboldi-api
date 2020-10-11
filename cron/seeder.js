const cron = require('node-cron');
const Game = require('../models/game');
const { run } = require('./scraper');

/*
Traigo la data obtenida de la web.
Si no existe, se crea un nuevo documento.
Ésta es la única forma con la que pude evitar el drop collection
y posiblemente perder data antigua.
De ésta manera siempre se mantiene hasta el partido más antiguo obtenido.
*/

const dbSeeder = async () => {
    try {
        let data = await run();

        for (let i = 0; i < data.length; i++) {
            await Game.updateOne({ date: data[i].date }, data[i], { upsert: true });
        }
    } catch (error) {
        console.log('Error while populating database');
    }

}

//Run cron every day at noon
const cronTask = cron.schedule('00 12 * * 0-6', dbSeeder);

module.exports = {
    cronTask: cronTask,
    dbSeeder: dbSeeder
}