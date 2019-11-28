'''用于在本机查看调用第三方API时的HTTP请求头'''
'''以及之后前后端连接时的请求头'''
'''以免垃圾Quick APP IDE无法调试'''

from wsgiref.simple_server import make_server

local_ip = "192.168.1.101" # 调试时这里改成本机ip


def app(environ, response):
    print(environ)
    response('200 OK', [])
    return [b'']


httpd = make_server(local_ip, 80, app)
httpd.serve_forever()