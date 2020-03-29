// adding new chat documents
// setting up a real time listener to get new chats
// update username
// update the room

class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsubscribe;
  }

  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // save the chat document to the database (firestore)

    const response = await this.chats.add(chat);

    // we may not need the return but it be useful
    return response;
  }

  getChats(callback) {
    this.unsubscribe = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            // update the ui
            callback(change.doc.data());
          }
        });
      });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  updateRoom(room) {
    this.room = room;
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}



// chatroom.addChat("hello there").then(() => {
//   console.log("chat added");
// }).catch(err => console.log(err));

// setTimeout(() => {
//   chatroom.updateRoom("gaming");
//   chatroom.updateName("yushi");
//   chatroom.getChats(data => {
//     console.log(data);
//   });
//   chatroom.addChat("hello guys");
// }, 3000);
