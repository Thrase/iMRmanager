from urllib.request import urlopen, Request

r = Request(url="http://47.101.159.58:9001/api/mr/new",
            data=b"{'user_id': 1, 'hospital': '', 'illness': ''}", method='POST')
r1 = urlopen(r)
print(r1.fp.read())
