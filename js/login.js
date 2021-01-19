var config = {
    apiKey: "AIzaSyDw1e4v5UdCN9tTNJv0TBMlOMVK_5gII6Y",
    databaseURL: "https://labv-ctrlaccesos-default-rtdb.firebaseio.com",
  };
  
  var database;

  window.onload = function(){
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          location.href = "./logs.html"
          // ...
          console.log("bene")
        } else {
          // User is signed out.
          // ...
          console.log("mal")
        }
      });
  }

function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => location.href = "./logs.html")
    .catch(function(error) {
        document.getElementById('bad').style.display = ""
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}