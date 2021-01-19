
var config = {
    apiKey: "AIzaSyDw1e4v5UdCN9tTNJv0TBMlOMVK_5gII6Y",
    databaseURL: "https://labv-ctrlaccesos-default-rtdb.firebaseio.com",
  };
  
  var database;
  
  var users;
  var areas;
  
  window.onload = function () {
    firebase.initializeApp(config);
  
  
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var table = document.getElementById("tableBody");
        console.log(table)
        database = firebase.database();
        database.ref('logs/').on('value', function (snap) {
          users = snap.val();
          console.log(users)
  
          var userRow = " ";
          for (const user in users) {
            const { nombre, login, signOut } = users[user];
            userRow += `
        <tr>
            <td id="${user}">${nombre}</td>
            <td>${login}</td>
            <td>${signOut}</td>
          </tr>
        `;
          }
          table.innerHTML = userRow
        })
        // ...
        console.log("bene")
      } else {
        window.location.href = "../login.html";
  
        console.log("mal")
      }
    });
  
    // Get a reference to the database service
  
  
  };
  
  function init() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }
  
  function filterTable(inputID, tableID) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputID);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableID);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
  function editRow(user) {
    const nombre = document.getElementById('inputNombre2')
    const apellidos = document.getElementById('inputApellidos2')
    const area = document.getElementById('inputArea2')
    nombre.value = users[user].nombre
    apellidos.value = users[user].apellidos
    document.getElementById("usuarioid").value = user;
  
    getAreas(2).then(() => {
      area.value = users[user].area;
    })
  }
  
  
  function updateUser() {
    const user = document.getElementById("usuarioid").value
    const nombre = document.getElementById('inputNombre2').value
    const apellidos = document.getElementById('inputApellidos2').value
    const area = document.getElementById('inputArea2').value
    database = firebase.database();
    database.ref('users/' + user).update({
      area,
      apellidos,
      nombre
    }, () => document.getElementById('closeModal2').click())
  
  }
  
  function getAreas(flag) {
    return new Promise((resolve, reject) => {
      database.ref('areas/').on('value', function (snap) {
        areas = snap.val();
        const selectAreas = document.getElementById(flag === 1 ? 'inputArea' : 'inputArea2');
        var options = "";
        for (const area in areas) {
          const data = areas[area].area;
          options += `<option value="${data}">${data}</option>`
        }
        selectAreas.innerHTML = options;
        resolve(true)
        console.log(areas)
      })
    })
  }
  
  function deleteRow(e) {
    console.log(e)
    if (confirm("¿Desea eliminar este registro?")) {
      console.log('users/' + e)
      database = firebase.database();
      database.ref('users/' + e).remove()
        .then(() => alert("usuario eliminado"))
    }
  }
  
  function createUser(datos) {
    const nombre = document.getElementById('inputNombre')
    const apellidos = document.getElementById('inputApellidos')
    const area = document.getElementById('inputArea')
    if (!nombre.value || !apellidos.value || !area.value)
      //console.log("error")
      return;
    database = firebase.database();
    database.ref(`users/${new Date().valueOf()}`).set({
      apellidos: apellidos.value,
      area: area.value,
      nombre: nombre.value
    }, (val) => {
      document.getElementById('closeModal').click();
      nombre.value = apellidos.value = area.value = "";
    })
    console.log(nombre.value, apellidos.value, area.value)
  }