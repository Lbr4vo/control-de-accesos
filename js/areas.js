
var config = {
    apiKey: "AIzaSyDw1e4v5UdCN9tTNJv0TBMlOMVK_5gII6Y",
    databaseURL: "https://labv-ctrlaccesos-default-rtdb.firebaseio.com",
};

var database;

var users;

window.onload = function () {
    firebase.initializeApp(config);


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Get a reference to the database service
            var table = document.getElementById("tableBody");
            console.log(table)
            database = firebase.database();
            database.ref('areas/').on('value', function (snap) {
                users = snap.val();
                console.log(users)

                var userRow = " ";
                for (const user in users) {
                    const { area } = users[user];
                    userRow += `
        <tr>
            <td>${area}</td>
            <td>
              <button type="button" class="btn btn-labeled btn-primary" data-toggle="modal" data-target="#exampleModal2" onclick="editRow('${user}')">
                <span class="btn-label"><i class="fas fa-pencil-alt"></i></span>Edit</button>
            </td>
            <td>
              <button type="button" class="btn btn-labeled btn-danger" onclick="deleteRow('${user}')">
                <span class="btn-label"><i class="fas fa-trash"></i></span>Trash</button>
            </td>
          </tr>
        `;
                }
                table.innerHTML = userRow
            })
        } else {
            window.location.href = "../login.html";

        }
    });


};



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
    nombre.value = users[user].area
    document.getElementById("usuarioid").value = user;
}


function updateUser() {
    const user = document.getElementById("usuarioid").value
    const nombre = document.getElementById('inputNombre2').value
    database = firebase.database();
    database.ref('areas/' + user).update({
        area: nombre
    }, () => document.getElementById('closeModal2').click())

}

function deleteRow(e) {
    console.log(e)
    if (confirm("¿Desea eliminar este registro?")) {
        console.log('areas/' + e)
        database = firebase.database();
        database.ref('areas/' + e).remove()
            .then(() => alert("usuario eliminado"))
    }
}

function createUser(datos) {
    const nombre = document.getElementById('inputNombre')

    if (!nombre.value)
        //console.log("error")
        return;
    database = firebase.database();
    database.ref(`areas/${new Date().valueOf()}`).set({
        area: nombre.value
    }, (val) => {
        console.log(val)
        nombre.value = "";
        document.getElementById('closeModal').click();

    })
    console.log(nombre.value, apellidos.value, area.value)
}