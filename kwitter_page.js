var firebaseConfig = {
    apiKey: "AIzaSyAtqR9SqtmzMOFg2DJNdQKwuXwTDOLfe_g",
    authDomain: "jitterdatabase.firebaseapp.com",
    databaseURL: "https://jitterdatabase-default-rtdb.firebaseio.com",
    projectId: "jitterdatabase",
    storageBucket: "jitterdatabase.appspot.com",
    messagingSenderId: "477888413955",
    appId: "1:477888413955:web:f66ed1ef6c6095d9d7e936"
  };
  roomName= localStorage.getItem("roomName");
  username= localStorage.getItem("userName");
   firebase.initializeApp(firebaseConfig);
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    Name = message_data['name'];
    message=message_data['message'];
    like=message_data['like'];
    nameWithTag="<h4>" + Name + "<img class='user_tick' src='tick.png'> </h4>";
    messageWithTag="<h4 class='message_h4'>" + message + "</h4>";
    likeButton ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; 
    spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
    row=nameWithTag + messageWithTag + likeButton + spanWithTag;
    document.getElementById("output").innerHTML += row;
} });  }); }
getData();
function updateLike(message_id) {
    console.log("clicked on the button -" + message_id);
    buttonID=message_id;
    likes=document.getElementById(buttonID).value;
    updatedLikes=Number(likes) + 1;
    console.log(updatedLikes);
    firebase.database().ref(roomName).child(message_id).update({
        like:updatedLikes
    });
}

function send() {
    msg=document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
        name:username,
        message:msg,
        like:0
    });
    document.getElementById("msg").value = "";
}
function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
    window.location = "index.html";
}