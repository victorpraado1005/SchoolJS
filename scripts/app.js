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

function aluno(nm, nome, sobrenome, n1, n2, turma){
  this.nm = nm;
  this.name = nome;
  this.lastName = sobrenome;
  this.n1 = n1;
  this.n2 = n2;
  this.turma = turma;
  this.media = function(){
     var resultado = (n1 + n2) / 2;
     return resultado;
  }
}

async function verificaDados(){
  var nome = document.getElementById('nameStudent').value
  var sobrenome = document.getElementById('lastNameStudent').value
  var n1 = document.getElementById('n1').value
  var n2 = document.getElementById('n2').value
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  if(n1 <= 10 && n2 <= 10){
    var nm = setNM()
    var turma = getClass()  
    var lengthClass = await verifyClassSize(turma)
    console.log(lengthClass)
      if(lengthClass == true){
        var a = new aluno(nm, nome, sobrenome, n1, n2, turma)
        db.collection('SchoolJS').add({
          name: nome,
          lastName: sobrenome,
          nota1: n1,
          nota2: n2,
          nm: nm,
          turma: turma,
        }).then(doc=>{
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
      console.log(student.name)
      classSize = classSize + 1 
    })    
  })
  console.log(classSize)
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
      // td_media.innerText = this.alunoTeste.media();
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

        let td_nm = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_sobrenome = tr.insertCell();
        let td_turma = tr.insertCell();
        let td_n1 = tr.insertCell();
        let td_n2 = tr.insertCell();
        let td_media = tr.insertCell();

        td_nm.innerText = student.nm;
        td_nome.innerText = student.name;        
        td_sobrenome.innerText = student.lastName;
        td_turma.innerText = student.turma;
        td_n1.innerText = student.nota1;
        td_n2.innerText = student.nota2;
        // td_media.innerText = this.alunoTeste.media();
        aux = true;
      })
    })
    // let student = getStudentByNM(searchNM)
    // console.log(student)  
    if(aux == false){
      alert("Não foi encontrado nenhum aluno com o NM: " + searchNM)
      document.getElementById("searchNM").value=''
    } 
    }
  

  function getStudentByNM(nm){
    let student = alunos.filter((aluno) => aluno.nm == nm)
    if(student.length == 0){
      alert("NM não encontrado!")
    }else{
      return student
    } 
  }

  function showStudentByTag(tbody, student){
    if(student == undefined){
      console.log("undefined")
    }else{
      let tr = tbody.insertRow();
      let td_nmFound = tr.insertCell()
      let td_nameFound = tr.insertCell()
      let td_lastNameFound = tr.insertCell()
      let td_classFound = tr.insertCell()
      let td_n1Found = tr.insertCell()
      let td_n2Found = tr.insertCell()
      let td_mediaFound = tr.insertCell()
      
      td_nmFound.innerText = student[0].nm
      td_nameFound.innerText = student[0].name
      td_lastNameFound.innerText = student[0].lastName
      td_classFound.innerText = student[0].turma
      td_n1Found.innerText = student[0].n1
      td_n2Found.innerText = student[0].n2
      td_mediaFound.innerText = student[0].media()
      document.getElementById("searchNM").value=''
    }
  }

  async function deleteStudent(){
    let deleteNM = document.getElementById('deleteNM').value
    deleteNM = parseFloat(deleteNM)
    var modalMessageSuccess = new bootstrap.Modal(document.getElementById('messageSuccess'))   
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
        modalMessageSuccess.show()
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