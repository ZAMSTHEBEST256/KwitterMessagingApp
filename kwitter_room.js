var firebaseConfig = {
      apiKey: "AIzaSyAtqR9SqtmzMOFg2DJNdQKwuXwTDOLfe_g",
      authDomain: "jitterdatabase.firebaseapp.com",
      databaseURL: "https://jitterdatabase-default-rtdb.firebaseio.com",
      projectId: "jitterdatabase",
      storageBucket: "jitterdatabase.appspot.com",
      messagingSenderId: "477888413955",
      appId: "1:477888413955:web:f66ed1ef6c6095d9d7e936"
    };
     firebase.initializeApp(firebaseConfig);
     var username = localStorage.getItem("userName");
     document.getElementById("username").innerHTML = "Welcome " + username;
     function addRoom() {
      roomName=document.getElementById("roomName").value;
          firebase.database().ref("/").child(roomName).update({
        purpose:"adding room"
    });
    localStorage.setItem("roomName", roomName);
    window.location="kwitterpage.html";
     }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      roomNames = childKey;
      //console.log("Room Name -" + roomNames);
      row = "<div class='room_name' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();
function redirectToRoomName(name) {
      console.log("Inside Redirect " + name);
      localStorage.setItem("roomName", name);
      window.location = "kwitter_page.html";
}
function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location="index.html";
}
