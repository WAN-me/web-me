from traceback import print_tb
import sbeaver
from sbeaver import file_server
server = sbeaver.Server(port=3050, sync=False)
import re



@server.sbind('/favicon.ico')
def fav(req):
    return sbeaver.redirect(301, '/assets/images/svg/icon.svg')

@server.ebind('/user<uid>')
def user(req, uid):
    with open('account.html', 'r') as f:
        return 200, f.read(-1).replace("get_user(0)",f"get_user({uid})")

@server.ebind('/me<uid>')
def me(req, uid):
    with open('me.html', 'r') as f:
        return 200, f.read(-1).replace("load(0)",f"load({uid})")

@server.bind('/')
def index(req):
    with open('index.html', 'r') as f:
        return 200, f.read(-1)


@server.bind(r'/(.*)')
def all(req:sbeaver.Request, filename = 'index.html'):
    return file_server.manage_files(req, False)


@server.code404()
def pnf(request):
    print(404)
    with open('404.html') as f:
        return f.read(-1)

server.start()
