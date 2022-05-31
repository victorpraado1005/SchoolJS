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

function createAccount(){
  var email = document.getElementById('createEmail').value
  var password = document.getElementById('createPassword').value
  var confirmPassword = document.getElementById('confirmPassword').value

  var emailArea = document.querySelector("#createEmail")
  var passwordArea = document.querySelector("#createPassword")
  var confirmPasswordArea = document.querySelector("#confirmPassword")

  if(email == '' && password == '' && confirmPassword == ''){
    alert("Preencha os campos obrigatórios.")
    emailArea.classList.add("no__data")
    passwordArea.classList.add("no__data")
    confirmPasswordArea.classList.add("no__data")
  }else if(email == ''){
    alert("Preencha o campo de E-mail!")
    emailArea.classList.add("no__data")
    passwordArea.classList.remove("no__data")
    confirmPasswordArea.classList.remove("no__data")
  }else if(password == ''){
    alert("Preencha o campo de Senha!")    
    emailArea.classList.remove("no__data")
    passwordArea.classList.add("no__data")
    confirmPasswordArea.classList.remove("no__data")
  }else if(confirmPassword == ''){
    alert("Preencha o campo de Confirmar Senha!")    
    emailArea.classList.remove("no__data")
    passwordArea.classList.remove("no__data")
    confirmPasswordArea.classList.add("no__data")     
  }
  else{
    auth.createUserWithEmailAndPassword(email, password)
      .then(userC=>{
        var user = userC.user
        console.log(user)
      }).catch(error=>{
        console.log(error)
    })
  }  
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

function logout(){
  auth.signOut().then(()=>{
    console.log("Usuário deslogado!!")
    window.location.href = "index.html";
  }).catch(error=>{
    console.log(error)
  })
}