function user_get(user_id) {
    if ('user' + user_id in localStorage) {
        console.log('userget ' + user_id + ' from local')
        return JSON.parse(localStorage.getItem('user' + user_id))
    } else {
        res = fetch('https://api.wanilla.ru/method/users.get?accesstoken=' + token + "&id=" + user_id, {
            method: 'GET'
        });

        user = res.json()
        localStorage.setItem('user' + user_id, JSON.stringify(user))
        return user_get(user_id)
    }
}

async function messages_gethitory(user_id, count = 10, ofset = 0) {
    res = await fetch('https://api.wanilla.ru/method/messages.gethistory?accesstoken=' + token + "&user_id=" + user_id + "&count=" + count + "&ofset=" + ofset, {
        method: 'GET'
    });
    return await res.json()
}