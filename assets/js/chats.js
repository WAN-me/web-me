function add_chat(chat) {

}

function load_chat(chat_id) {
    window.location.href = 'me' + chat_id;
}

async function get_chats() {
    chats = await messages_chats(30)
    chats.items.forEach(chat => {
        div = document.createElement("div");
        div.id = 'chat' + chat.id

        alink = document.createElement("a");
        alink.id = 'chat-link' + chat.id
        alink.href = '/user' + chat.id

        chimg = document.createElement("img");
        chimg.id = 'chat-image' + chat.id
        chimg.src = ''

        alink.appendChild(chimg)
        div.appendChild(alink)

        pname = document.createElement("p");
        pname.id = 'chatname' + chat.id
        pname.textContent = chat.name


        div.appendChild(pname)
        div.className = 'chat'
        div.addEventListener('click', function(event) {
            load_chat(chat.id)
        });
        document.getElementById('field-box').appendChild(div);
        add_chat(chat)
    });
}