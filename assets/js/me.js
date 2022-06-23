async function scr() {
    console.log(document.getElementById('field-box').scroll)
}

async function load(user_id) {
    me = JSON.parse(localStorage.getItem('me'))
    token = localStorage.getItem('token');
    field_box = document.getElementById('field-box')
    await get_old(user_id)
    field_box.scrollTop = field_box.scrollHeight;
    pl_get(user_id)
}

async function get_old(user_id) {
    messages = await messages_gethitory(user_id, 300)
    console.log(messages)
    messages.items.reverse().forEach(function(message) {
        do_msg(message)
    })
}

async function do_msg(message) {
    console.log(message)
    var li = document.createElement("li");
    if (message.from_id == me.id) {
        li.appendChild(document.createTextNode(message.text));
        li.className = 'me_msg'
    } else {
        user = user_get(message.from_id)
        li.appendChild(document.createTextNode(user.name + ': ' + message.text));
        li.className = 'nome_msg'
    }
    need_scroll = field_box.scrollTop + 1000 >= field_box.scrollHeight
    console.log(field_box.scrollTop, field_box.scrollHeight)
    console.log(need_scroll)
    document.getElementById('field-box').appendChild(li);
    if (need_scroll)
        field_box.scrollTop = field_box.scrollHeight;
}

async function pl_get(user_id) {

    if (user_id == 0)
        user_id = me.id

    console.log('start')
    id = null
    while (true) {
        if (id != null) {
            url = 'https://api.wanilla.ru/method/poll.get?accesstoken=' + token + "&id=" + id
        } else
            url = 'https://api.wanilla.ru/method/poll.get?accesstoken=' + token
        res = await fetch(url, {
            method: 'GET'
        });
        json = await res.json()
        if ('id' in json) {
            id = json['id']
        } else {
            if (json['count'] > 0) {
                json['items'].forEach(function(up) {
                    id = up['event_id']
                    console.log(up.type)
                    if (up.object.from_id == user_id || (up.object.to_id == user_id && up.object.to_id != me.id)) {
                        if ([1, 2].includes(up.type)) {
                            do_msg(up.object)

                        }


                    }
                })
            }
        }
    }


}