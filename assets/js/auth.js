async function auth() {
    console.log('auth')
    login = document.getElementById('login').value
    password = document.getElementById('password').value

    res = await fetch('https://api.wanilla.ru/method/account.auth', {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            email: login
        })
    });
    json = await res.json()
    if (res.status != 200) {
        alert(json.error.text)
    } else {
        localStorage.setItem('me', JSON.stringify(json))
        localStorage.setItem('token', json.token)
        window.location.href = 'account.html';

    }
}