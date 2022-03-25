import os.path
import sbeaver
server = sbeaver.Server(port=8001)
import re
print(re.fullmatch(r'/(\S*)', '/index.html'))

@server.sbind('/favicon.ico')
def fav(req):
    return sbeaver.file('icon.svg', sbeaver.Types.image.svg)

@server.bind(r'/(\w+)\.(\w+)')
def index(req, filename = 'index', ex = 'html'):
    if os.path.exists(filename+'.'+ex):
        if ex in sbeaver.Types.image.__dict__:
            return sbeaver.file(filename+'.'+ex, sbeaver.Types.image.__dict__[ex])
        elif ex == 'html':
            with open(filename+'.'+ex, 'r') as f:
                return 200, f.read(-1)
        elif ex in sbeaver.Types.text.__dict__:
            return sbeaver.file(filename+'.'+ex, sbeaver.Types.text.__dict__[ex])
        else:
            with open(filename+'.'+ex, 'rb') as f:
                return 200, f.read(-1)
    with open('404.html') as f:
        return 404, f.read(-1)


@server.code404()
def pnf(request):
    print(404)
    with open('404.html') as f:
        return f.read(-1)
print(server.__dict__)
server.start()
