import asyncio
from pyppeteer import launch

class test():

    async def getContent():
        browser = await launch()
        page = await browser.newPage()
        await page.goto('https://es.wallapop.com/search?keywords=playstation&min_sale_price=200&max_sale_price=500&latitude=41.38016&longitude=2.16872&filters_source=quick_filters')
        content = await page.evaluate('document.body.innerHTML', force_expr=True)
        print(content)
        await browser.close()

    def main():
        asyncio.get_event_loop().run_until_complete(test.getContent())

test.main()