async function reg() {
    login = document.getElementById('login').value
    password = document.getElementById('password').value
    name = document.getElementById('name').value
    invitation = document.getElementById('invitation').value

    res = await fetch('https://api.wanilla.ru/method/account.reg', {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            email: login,
            name: name,
            invitation: invitation
        })
    });
    json = await res.json()
    if (res.status != 200) {
        alert(json.error.text)
    } else {
        console.log(json)
        localStorage.setItem('me', JSON.stringify(json))
        localStorage.setItem('token', json.token)
        window.location.href = 'account.html';

    }
}