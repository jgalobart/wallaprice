from http.server import BaseHTTPRequestHandler

import urllib.request

class handler(BaseHTTPRequestHandler):

    def do_GET(self,search="",latitude="40.43786",longitude="-3.81962",min_sale_price="50",max_sale_price="10000"):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        URL = "https://es.wallapop.com/search?keywords="+search+"min_sale_price="+min_sale_price+"&max_sale_price="+max_sale_price+"&latitude="+latitude+"&longitude="+longitude+"&filters_source=search_box"
        print(URL)
        webURL = urllib.request.urlopen(URL)
        data = webURL.read()
        print(data)
        self.wfile.write(data)
        print("end")
        return(data)