textbox = document.getElementById('inp-box')
textbox.addEventListener("keydown", function(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        send_msg()
    }
});

async function send_msg() {
    if (textbox.text != "") {
        user_id = location.pathname.split('me')[1]
        console.log(user_id)
        text = textbox.value
        res = fetch('https://api.wanilla.ru/method/messages.send?accesstoken=' + token + "&to_id=" + user_id, {
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        textbox.value = ""
    }
}

function scr() {
    console.log(document.getElementById('field-box').scroll)
}

async function load_info(user_id) {
    user = await user_get(user_id)
    document.getElementById('username').textContent = user.name
    document.getElementById('user-image').src = user.image
    document.getElementById('user-link').href = 'https://wanilla.ru/user' + user.id
    document.title = user.name
    now = new Date().getTime()
    if (user.online_state >= now / 1000) {
        document.getElementById('online').textContent = 'Online'
    } else {
        diff = now / 1000 - user.online_state
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
}

function load(user_id) {

    field_box = document.getElementById('field-box')
    get_old(user_id)
    field_box.scrollTop = field_box.scrollHeight;
    load_info(user_id)
    pl_get(user_id)
}

async function get_old(user_id) {
    messages = await messages_gethitory(user_id, 50)
    console.log(messages)
    messages.items.reverse().forEach(function(message) {
        do_msg(message)
    })
}

async function draw_msg(message) {
    msg_box = document.getElementById("msg" + message.id)
    console.log(msg_box)
    if (message.from_id == me.id) {
        msg_box.textContent = message.text
        msg_box.className = 'me_msg'
    } else {
        user_get(message.from_id, function(user, msg_box) {
            console.log(user)
            msg_box.textContent = user.name + ': ' + message.text
            msg_box.className = 'nome_msg'
        }, msg_box)
    }
}

function do_msg(message) {
    console.log(message)
    var li = document.createElement("li");
    li.id = "msg" + message.id
    document.getElementById('field-box').appendChild(li);
    draw_msg(message)
    need_scroll = field_box.scrollTop + 1000 >= field_box.scrollHeight
    console.log(field_box.scrollTop, field_box.scrollHeight)
    console.log(need_scroll)
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