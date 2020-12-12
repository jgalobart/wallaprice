import * as playwright from 'playwright-aws-lambda';

function run()  {
    return new Promise(async function(resolve,reject){
        console.log("run")
        const browser = playwright.launchChromium();
        console.log("run2")
        const context = browser.newContext();
        const page = await context.newPage();
        await page.goto('https://es.wallapop.com/search?keywords=playstation&min_sale_price=200&max_sale_price=500&latitude=41.38016&longitude=2.16872&filters_source=quick_filters');
        const dimensions = await page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                deviceScaleFactor: window.devicePixelRatio
            }
        });
        console.log(dimensions);

        await browser.close();

        resolve()
    })
    .catch(() => {
        console.error("catcherror")
    })
  };

module.exports = (req, res) => {
    const { name = 'World' } = req.query
    res.status(200).send(`Hello ${name}!`)
    console.log("start")
    run().then(console.log("endrun")).catch(console.log("error"))
    console.log("end")
    console.log("--------")
  }