from http.server import BaseHTTPRequestHandler

import urllib.request

def do_GET(self,search=""):
    try:
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        LATITUDE="40.43786"
        LONGITUDE="-3.81962"
        URL = "https://es.wallapop.com/search?keywords="+search+"&latitude="+LATITUDE+"&longitude="+LONGITUDE+"&filters_source=search_box"
        print(URL)
        webURL = urllib.request.urlopen(URL)
        data = webURL.read()
        self.wfile.write(data.encode())
        return
    catch():
        self.send_response(500)
        self.send_header('Content-type','text/plain')
        self.end_headers()

data = getContent('test')
print(data)