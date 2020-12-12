'''from http.server import BaseHTTPRequestHandler

import urllib.request
import asyncio
from pyppeteer import launch

async def getContent(future):
        browser = await launch()
        page = await browser.newPage()
        await page.goto('https://es.wallapop.com/search?keywords=playstation&min_sale_price=200&max_sale_price=500&latitude=41.38016&longitude=2.16872&filters_source=quick_filters')
        content = await page.evaluate('document.body.innerHTML', force_expr=True)
        print(content)
        await browser.close()
        future.set_result('Future is done!')
        return("test getContent")

def test():
        return("test")

def launchGetContent():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    future = asyncio.Future()
    asyncio.ensure_future(getContent(future))
    loop.run_until_complete(future)
    print(future.result())
    loop.close()
    return("test launch")

class handler(BaseHTTPRequestHandler):

    def do_GET(self,
            search="",
            latitude="40.43786",
            longitude="-3.81962",
            min_sale_price="50",
            max_sale_price="10000"
            ):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        URL = "https://es.wallapop.com/search?keywords="+search+"min_sale_price="+min_sale_price+"&max_sale_price="+max_sale_price+"&latitude="+latitude+"&longitude="+longitude+"&filters_source=search_box"
        print(URL)
        webURL = urllib.request.urlopen(URL)
        data = webURL.read()
        self.wfile.write(data)
        print(data)

        data1 = test()
        print(data1)

        launchGetContent()

        print("end")
        return(data)'''