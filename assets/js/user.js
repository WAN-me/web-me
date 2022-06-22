function set_image() {
    console.log('imgs')
    token = localStorage.getItem('token');
    url = prompt('insert new image url')
    if (url != "" && url != null) {
        console.log(url)
        res = fetch('https://api.wanilla.ru/method/account.edit?accesstoken=' + token, {
            method: 'POST',
            body: JSON.stringify({
                image: url
            })
        });
    }
}


async function get_user(user_id) {

    token = localStorage.getItem('token');
    me = JSON.parse(localStorage.getItem('me'))
    res = await fetch('https://api.wanilla.ru/method/users.get?accesstoken=' + token + "&id=" + user_id, {
        method: 'POST'
    });

    json = await res.json()
        //if (res.status != 200) {
        //    alert(json.error.text)
        //} else {
        //    localStorage.setItem('me', JSON.stringify(json))
        //}

    if (!me) {
        console.log("нет имени!")
        window.location.href = 'auth.html';
    }
    document.getElementById('hello_user').textContent = json.name + '`s profile'
    document.getElementById('pimg').textContent = "Profile image of " + json.name
    document.title = json.name
    now = new Date().getTime()
    if (json.online_state >= now / 1000) {
        document.getElementById('online').textContent = 'Online'
    } else {
        diff = now / 1000 - json.online_state
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
    img = document.getElementById('img')

    img.src = json.image
    img.dataset.hystmodal = "#myModal"

    document.getElementById('mimg').src = json.image
    if (me.id == json.id) {
        //document.getElementById('img').onclick = set_image
    } else {

    }
}