// dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
// add new chat
newChatForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch(err => {
      console.log(err);
    });
});


// change the chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatList.innerHTML = '';
        const newRoom = e.target.textContent.slice(1);
        chatroom.updateRoom(newRoom);
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// check localStorage for a name
const username = localStorage.username ? localStorage.username : "Anonymous";
//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new ChatRoom("gaming", username);

//get chats and render
chatroom.getChats(data => {
  chatUI.render(data);
});

// change name
newNameForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = newNameForm.name.value.trim();
  chatroom.updateName(name);

  newNameForm.reset();
  updateMsg.innerText = `your chat name was updated to ${name}`;
  setTimeout(() => (updateMsg.innerText = ""), 3000);
});

