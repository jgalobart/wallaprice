const playwright = require('playwright-aws-lambda');

function getPriceTable(cards) {
    var priceTable = {}
    for (var card in cards) {
        //priceTable.push(cards[card].price)
        priceTable[cards[card].price] = priceTable[cards[card].price] ? priceTable[cards[card].price]+1 : 1; 
    }
    return priceTable;
}

exports.handler = async function(event) {

    const browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();

    const search = !event.queryStringParameters.search ? "playstation" : event.queryStringParameters.search;
    const min_sale_price = !event.queryStringParameters.min_sale_price ? "0" : event.queryStringParameters.min_sale_price;
    const max_sale_price = !event.queryStringParameters.max_sale_price ? "10000" : event.queryStringParameters.max_sale_price;
    const latitude = !event.queryStringParameters.latitude ? "40.43786" : event.queryStringParameters.latitude;
    const longitude = !event.queryStringParameters.longitude ? "40.43786" : event.queryStringParameters.longitude;
    const url = "https://es.wallapop.com/search?keywords="+search+
        "&min_sale_price="+min_sale_price+
        "&max_sale_price="+max_sale_price+
        "&latitude="+latitude+
        "&longitude="+longitude+
        "&filters_source=quick_filters";

    await page.goto(url);
    /*const result = await page.content();*/
    const cards =await page.$$eval('.card',
        elements => elements.map(
            el => ({
                "text": el.innerText,
                "content": el.outerHTML,
                "price": el.innerText.substring(0,el.innerText.indexOf("€")-1),
            })
            )
        )

    return {
        statusCode: 200,
        body: JSON.stringify({
            priceTable: getPriceTable(cards),
            cards: cards,
            query: event.queryStringParameters,
        })
    };
}