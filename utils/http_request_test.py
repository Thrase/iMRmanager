from wsgiref.simple_server import make_server
'''用于在本机查看调用第三方API时的HTTP请求头'''
'''以及之后前后端连接时的请求头'''
'''以免垃圾Quick APP IDE无法调试'''


local_ip = "192.168.43.114"  # 调试时这里改成本机ip


def app(environ, response):
    print(environ)
    # request_path = environ["PATH_INFO"]
    request_data = environ["wsgi.input"].read(
        int(environ.get("CONTENT_LENGTH", 0)))
    response('200 OK', [])
    f = open("1.html", "wb")
    f.write(request_data)
    return [b'']


httpd = make_server(local_ip, 80, app)
httpd.serve_forever()
