var alunos = []
var lastID = 1

const db = firebase.firestore()

//atualização em tempo real do DB para verificar o lastID
db.collection("SchoolJS").where("nm", ">", 0).onSnapshot(snapshot=>{
      snapshot.forEach(doc=>{
      let aluno = doc.data();
      lastID = aluno.nm + 1
  })
})

var inputNome = document.querySelector("#nameStudent");

nameStudent.addEventListener("keypress", function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});

var inputLastName = document.querySelector("#lastNameStudent");

lastNameStudent.addEventListener("keypress", function(e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
  
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});

function getMedia(n1, n2){
  var result = (n1 + n2) / 2
  return result
}

async function createStudent(){
  var nome = document.getElementById('nameStudent').value
  var sobrenome = document.getElementById('lastNameStudent').value
  var n1 = document.getElementById('n1').value
  var n2 = document.getElementById('n2').value
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  if(n1 <= 10 && n2 <= 10){
    var nm = setNM()
    var turma = getClass()
    var media = getMedia(n1, n2)
    var lengthClass = await verifyClassSize(turma)
      if(lengthClass == true){
        db.collection('SchoolJS').add({
          name: nome,
          lastName: sobrenome,
          nota1: n1,
          nota2: n2,
          nm: nm,
          turma: turma,
          media: media,
        }).then(doc=>{
          alert('Aluno Criado com sucesso!')
          console.log("Documento inserido com sucesso: ", doc)
        }).catch(err=>{
          console.log(err)
        })
        clearInput()
        return alunos.push(a)
      }else{
        alert("A Turma " + turma + " está lotada, favor selecionar outra turma!")
      } 
  }else{
    alert("As notas não devem ser maiores que 10!")
    document.getElementById("n1").value=''
    document.getElementById("n2").value=''
  }
  
}

function getClass(){
  var select = document.getElementById('turma')
  return select.options[select.selectedIndex].value
}

function setNM(){
  return lastID++
}

async function verifyClassSize(turma){
  let classSize = 0
  await db.collection("SchoolJS").where("turma", "==", turma).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      let student = doc.data()
      classSize = classSize + 1 
    })    
  })
  if(classSize <= 9){
    return true
  }else{
    return false
  }
}

function showStudent(){
  let tbody = document.getElementById('tbodyShow')
  tbody.innerText = '';
  var select = document.getElementById('turmaVisualizar')
  var turmaVisualizar = select.options[select.selectedIndex].value
  
 db.collection("SchoolJS").where("turma", "==", turmaVisualizar).get()
  .then(snapshot=>{
    snapshot.forEach(docTeste=>{
      let student = docTeste.data()
      let tr = tbody.insertRow();

      let td_nm = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_sobrenome = tr.insertCell();
      let td_n1 = tr.insertCell();
      let td_n2 = tr.insertCell();
      let td_media = tr.insertCell();

      td_nm.innerText = student.nm;
      td_nome.innerText = student.name;
      td_sobrenome.innerText = student.lastName;
      td_n1.innerText = student.nota1;
      td_n2.innerText = student.nota2;
      td_media.innerText = student.media;
    })
  }) 
}

function hideStudents(){
  let tbody = document.getElementById('tbodyShow')
  tbody.innerText = '';
}

async function getStudentSearch(){
  let tbodySearch = document.getElementById("tbodySearch")
  tbodySearch.innerText = ''
  var searchNM = document.getElementById("searchNM").value
  searchNM = parseFloat(searchNM);
  var aux = false
  
  await db.collection("SchoolJS").where("nm", "==", searchNM).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        let student = doc.data()
        let tr = tbodySearch.insertRow();

        let td_nome = tr.insertCell();
        let td_sobrenome = tr.insertCell();
        let td_turma = tr.insertCell();
        let td_n1 = tr.insertCell();
        let td_n2 = tr.insertCell();
        let td_media = tr.insertCell();

        td_nome.innerText = student.name;        
        td_sobrenome.innerText = student.lastName;
        td_turma.innerText = student.turma;
        td_n1.innerText = student.nota1;
        td_n2.innerText = student.nota2;
        td_media.innerText = student.media;
        aux = true;
      })
    }) 
    if(aux == false){
      alert("Não foi encontrado nenhum aluno com o NM: " + searchNM)
      document.getElementById("searchNM").value=''
    } 
    }

  async function deleteStudent(){
    let deleteNM = document.getElementById('deleteNM').value
    deleteNM = parseFloat(deleteNM)      
    let studentID = null
    // get no banco para buscar o id do doc do aluno no firebase
    await db.collection("SchoolJS").where("nm", "==", deleteNM).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        studentID = doc.id                            
      })
    })
    if(studentID == null){
      alert("Nenhum aluno encontrado com o NM: " + deleteNM)
      document.getElementById('deleteNM').value=''
    }else{
      db.collection("SchoolJS").doc(studentID).delete().then(()=>{
        showStudent()
        alert('Aluno excluído com sucesso!')
        document.getElementById('deleteNM').value=''
      }).catch(err=>{
        console.log("Não foi possível excluir o aluno. ", err)
      })
    }
  }

function clearSearch(){
  let x = document.getElementById('tbodySearch')
  x.innerText = ''
}

function clearInput(){
    document.getElementById('nameStudent').value='';
    document.getElementById('lastNameStudent').value='';
    document.getElementById('n1').value='';
    document.getElementById('n2').value='';
}