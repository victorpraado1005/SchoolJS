const firebaseConfig = {
  apiKey: "AIzaSyBrFXiPOBMwNTGR9mhKicqk-8dPOleHTNk",
  authDomain: "schooljs-d5a0c.firebaseapp.com",
  projectId: "schooljs-d5a0c",
  storageBucket: "schooljs-d5a0c.appspot.com",
  messagingSenderId: "700833576926",
  appId: "1:700833576926:web:404cd59ac38650e0258f4f"
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

function createAccount(email, password){
  var email = document.getElementById('createEmail').value
  var password = document.getElementById('createPassword').value

  auth.createUserWithEmailAndPassword(email, password)
  .then(userC=>{
    var user = userC.user
    console.log(user)
  }).catch(error=>{
    console.log(error)
  })
}

function login(){
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  auth.signInWithEmailAndPassword(email, password)
  .then(userL=>{
    var user = userL.user
    console.log(userL)
    window.location.href = "pages/home.html";
  }).catch(error=>{
    alert('Usuário ou senha incorreta. Tente novamente!')
    console.log(error)
  })
}