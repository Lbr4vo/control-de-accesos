var config = {
    apiKey: "AIzaSyDw1e4v5UdCN9tTNJv0TBMlOMVK_5gII6Y",
    databaseURL: "https://labv-ctrlaccesos-default-rtdb.firebaseio.com",
};

var database;

var users;
var areas;


window.onload = function () {
    firebase.initializeApp(config);
    // document.getElementById('isActive').style.display = 'none';
    // document.getElementById('noActive').style.display = 'none';
    if (isActive()) {
        firebase.database().ref("users/" + localStorage.getItem('active')).on('value', function (snap) {
            const user = snap.val();
            document.getElementById('isActive').style.display = '';

        })
    }
    else {
        document.getElementById('noActive').style.display = '';
    }
};

function login() {
    const nombre = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    database = firebase.database();
    database.ref('users/' + pass).on('value', function (snap) {
        users = snap.val();
        if (!users)
            document.getElementById('errorMsj').style.display = ''
        else {
            if (users.nombre.toLowerCase() === nombre.toLowerCase()) {

                //insert to db
                const idLog = new Date().valueOf()
                database.ref('logs/' + idLog).set({
                    userID: pass,
                    nombre: users.nombre,
                    login: moment().format('YYYY-MM-DD HH:mm'),
                    signOut: null
                }, () => {
                    localStorage.setItem("active", pass);
                    localStorage.setItem("toDayLog", idLog);
                    document.getElementById('isActive').style.display = '';
                    document.getElementById('noActive').style.display = 'none';
                })
            }
        }
    })
}

function signOut() {
    if (confirm("¿Deseas hacer checkout? recuerda que al hacerlo, marcaras tu salida")) {

        //insert to db
        database = firebase.database();
        // console.log('logs/' + localStorage.getItem('active'))
        console.log()
        database.ref('logs/' + localStorage.getItem('toDayLog')).update({
            signOut: moment().format('YYYY-MM-DD HH:mm')
        }, () => {
            localStorage.removeItem("active");
            localStorage.removeItem('toDayLog');
            document.getElementById('isActive').style.display = 'none';
            document.getElementById('noActive').style.display = '';
        })
    }
}

function isActive() {
    const active = localStorage.getItem("active");
    if (active)
        return true;
    return false;
}