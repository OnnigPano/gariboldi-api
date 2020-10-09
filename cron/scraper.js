const puppeteer = require("puppeteer");

exports.run = async () => {
    // Abre el navegador y prepara la pagina
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // carga la url y espera al contenido
    await page.goto("https://www.lcfc.com/matches/results", { waitUntil: 'networkidle0' });

    // ejecuta el JS en la página
    const allMatches = await page.evaluate(() => {

        //traigo la data necesaria
        const jsonResult = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText);
        //traigo los resultados de cada partido
        const scores = document.querySelectorAll('.match-item__score--completed');
        
        let data = [];

        for (let i = 0; i < jsonResult.length; i++) {
            data.push({
                date: jsonResult[i].startDate,
                description: jsonResult[i].name,
                stadium: jsonResult[i].location.name,
                homeTeam: jsonResult[i].homeTeam.name,
                awayTeam: jsonResult[i].awayTeam.name,
                homeScore: scores[i].children[0].innerText,
                awayScore: scores[i].children[1].innerText
            })
        }
        
        return data;
    });

    
    // cierra el navegador
    await browser.close();
    
    return allMatches;
};