const { chromium } = require('playwright-core');
const awsChromium = require('chrome-aws-lambda');


async function run () {

    const browser = await chromium.launch({
        headless: false,
        executablePath: awsChromium.executablePath,
    });
    
    try {

        console.log("run")
        console.log("browser")
        const context = await browser.newContext();

        const page = await context.newPage();
        await page.goto(pageToScrape);
        const result = await page.content();
        console.log(result);
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (browser !== null) {
          await browser.close();
        }
    }
    return
};

module.exports = (req, res) => {
    const { name = 'World' } = req.query
    res.status(200).send(`Hello ${name}!`)
    console.log("start")
    run()
    console.log("end")
    console.log("--------")
  }