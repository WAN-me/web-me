async function get_user(user_id) {

    token = localStorage.getItem('token');
    me = JSON.parse(localStorage.getItem('me'))
    res = await fetch('https://api.wanilla.ru/method/users.get?accesstoken=' + token + "&id=" + user_id, {
        method: 'POST'
    });

    json = await res.json()
    if (res.status != 200) {
        alert(json.error.text)
    } else {
        localStorage.setItem('me', JSON.stringify(json))

    }

    if (!me) {
        console.log("нет имени!")
        window.location.href = 'auth.html';
    }
    document.getElementById('hello_user').textContent = me.name + '`s profile'
    document.title = me.name
    document.getElementById('link').href = me.image
    now = new Date().getTime()
    if (me.online_state >= now / 1000) {
        document.getElementById('online').textContent = 'Online'
    } else {
        diff = now / 1000 - me.online_state
        if (diff < 120) {
            document.getElementById('online').textContent = 'Just now'
        } else if (diff < 3600) {
            document.getElementById('online').textContent = parseInt((diff / 60)) + " minutes ago"
        } else if (diff < 86400) {
            document.getElementById('online').textContent = parseInt(diff / 3600) + " hours ago"
        } else if (diff > 86400) {
            document.getElementById('online').textContent = parseInt(diff / 86400) + " days ago"
        }

    }
    document.getElementById('img').src = me.image

}