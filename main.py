import os.path
import sbeaver
server = sbeaver.Server(port=8000, sync=False)
import re

@server.sbind('/favicon.ico')
def fav(req):
    return sbeaver.redirect(301, '/assets/images/svg/icon.svg')


@server.bind(r'/(.*)')
def alll(req, filename = 'index.html'):
    ex = re.split('\.', req.path)[-1]
    if os.path.exists(filename):
        if ex in sbeaver.Types.image.__dict__:
            return sbeaver.file(filename, sbeaver.Types.image.__dict__[ex])
        elif ex == 'html':
            with open(filename, 'r') as f:
                return 200, f.read(-1)
        elif ex in sbeaver.Types.text.__dict__:
            return sbeaver.file(filename, sbeaver.Types.text.__dict__[ex])
        else:
            with open(filename, 'rb') as f:
                return 200, f.read(-1)
    with open('404.html') as f:
        return 404, f.read(-1)




@server.code404()
def pnf(request):
    print(404)
    with open('404.html') as f:
        return f.read(-1)

server.start()
