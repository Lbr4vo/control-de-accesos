var config = {
    apiKey: "AIzaSyDw1e4v5UdCN9tTNJv0TBMlOMVK_5gII6Y",
    databaseURL: "https://labv-ctrlaccesos-default-rtdb.firebaseio.com",
  };

  firebase.initializeApp(config);

  function cerrarSesion(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location.href="./login.html";
      }).catch(function(error) {
        // An error happened.
      });
  }