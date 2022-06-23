me = JSON.parse(localStorage.getItem('me'))
if (!me) {
    window.location.href = 'auth.html';
}
token = localStorage.getItem('token');

res = fetch('https://api.wanilla.ru/method/account/setonline?accesstoken=' + token)

if (res.status == 400) {
    localStorage.removeItem('me')
    localStorage.removeItem('token')
    window.location.href = 'auth.html';
}