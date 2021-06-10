var app = new Vue({
  el: '#app',
  data: {
    usuario: null,
    password: null,
    usuarioActual: null,
    message: null,
    chats: [],
    partido: null,
  },
  methods: {

    enviarMensaje: function (partido) {
      firebase.database().ref(partido).push({
        mensaje: app.message,
        user: app.usuarioActual
      })
      app.message = null;

    },


    leerMensaje: function (partido) {
      firebase.database().ref(partido).off('child_added')
      firebase.database().ref(partido).on('child_added', function (dataSnapshot) {
        app.chats.push(dataSnapshot.val());
      });
    },

    numOfMatch: function (num) {
      app.partido = null;
      app.chats = [],
        app.partido = num;
      app.leerMensaje(app.partido);
    },

    crearUsuario: function () {
      firebase.auth().createUserWithEmailAndPassword(app.usuario, app.password)
        .catch(function (error) {
          var errorMessage = error.message;
          alert(errorMessage);
        });;
    },


    iniciarSesion: function () {
      firebase.auth().signInWithEmailAndPassword(app.usuario, app.password)
        .catch(function (error) {
          var errorMessage = error.message;
          alert(errorMessage);
        });
    },


    iniciarGoogle: function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider)
    },


    cerrarSesion: function () {
      firebase.auth().signOut()
    },

    configurarAuth: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          app.usuarioActual = user.email;

         // document.getElementById('logged').innerHTML = "hola " + app.usuarioActual + "!";

          console.log(user.email)
        } else {
          app.usuarioActual = null;
         // document.getElementById('logged').innerHTML = "";
          console.log("signed out")
        }
      });
    },

    configurarFirebase: function () {
      var firebaseConfig = {
        apiKey: "AIzaSyBxp9RceQlcSQ-q-iT1dycRJgmOsJKdOy0",
        authDomain: "nysl-7a389.firebaseapp.com",
        databaseURL: "https://nysl-7a389-default-rtdb.firebaseio.com",
        projectId: "nysl-7a389",
        storageBucket: "nysl-7a389.appspot.com",
        messagingSenderId: "599365178396",
        appId: "1:599365178396:web:b6c185f0c41d72472dfbd9",
        measurementId: "G-Y3ZM1YPF1C"
      };
      firebase.initializeApp(firebaseConfig);
      //var provider = new firebase.auth.GoogleAuthProvider();



    },


    myFunction: function (page) {

      if (document.getElementById(page).classList.contains("d-none")) {
        document.getElementById("home").classList.add("d-none");
        document.getElementById("info").classList.add("d-none");
        document.getElementById("rules").classList.add("d-none");
        document.getElementById("contacto").classList.add("d-none");
        document.getElementById(page).classList.remove("d-none");
      }
    }


  },

})

app.configurarFirebase();
app.configurarAuth();
app.myFunction("home")