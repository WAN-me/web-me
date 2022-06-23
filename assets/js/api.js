async function user_get(user_id, callback = function() {}, params = []) {
    if ('user' + user_id in localStorage) {
        console.log('userget ' + user_id + ' from local')
        user = JSON.parse(localStorage.getItem('user' + user_id))
        await callback(user, params)
        return user
    } else {
        res = await fetch('https://api.wanilla.ru/method/users.get?accesstoken=' + token + "&id=" + user_id, {
            method: 'GET'
        });

        user = await res.json()
        localStorage.setItem('user' + user_id, JSON.stringify(user))
        return user_get(user_id, callback, params)
    }
}

async function messages_gethitory(user_id, count = 10, ofset = 0) {
    res = await fetch('https://api.wanilla.ru/method/messages.gethistory?accesstoken=' + token + "&user_id=" + user_id + "&count=" + count + "&ofset=" + ofset, {
        method: 'GET'
    });
    console.log(res)
    return await res.json()
}

async function messages_chats(count = 10, ofset = 0) {
    res = await fetch('https://api.wanilla.ru/method/messages.chats?accesstoken=' + token + "&count=" + count + "&ofset=" + ofset, {
        method: 'GET'
    });
    return await res.json()
}