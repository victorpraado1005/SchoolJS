var alunos = []

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

function verificaDados(){
  var nome = document.getElementById('nameStudent').value
  var sobrenome = document.getElementById('lastNameStudent').value
  var n1 = document.getElementById('n1').value
  var n2 = document.getElementById('n2').value
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  if(n1 <= 10 && n2 <= 10){
    var nm = setNM()
    var turma = getClass()  
    var lengthClass = verifyClassSize(turma)
      if(lengthClass == true){
        var a = new aluno(nm, nome, sobrenome, n1, n2, turma)
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
  nm = 1;
  for (let i = 0; i < alunos.length; i++){
    nm = nm + 1;
  }
  return nm;
}

function verifyClassSize(turma){
  var counter = 0;
  for (let i = 0; i < alunos.length; i++){
    if(turma == alunos[i].turma){        
      counter = counter + 1;
    }
  }
  if(counter < 10){
    //true para quando tem espaço na turma
    return true
  }else{
    //false para quando não tem espaço na turma
    return false
  }
}

function showStudent(){
  let tbody = document.getElementById('tbodyShow')
  tbody.innerText = '';
  var select = document.getElementById('turmaVisualizar')
  var turmaVisualizar = select.options[select.selectedIndex].value

  for (let i = 0; i < alunos.length; i++) {
    if(alunos[i].turma == turmaVisualizar){
      let tr = tbody.insertRow();

      let td_nm = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_sobrenome = tr.insertCell();
      let td_n1 = tr.insertCell();
      let td_n2 = tr.insertCell();
      let td_media = tr.insertCell();

      td_nm.innerText = this.alunos[i].nm;
      td_nome.innerText = this.alunos[i].name;
      td_sobrenome.innerText = this.alunos[i].lastName;
      td_n1.innerText = this.alunos[i].n1;
      td_n2.innerText = this.alunos[i].n2;
      td_media.innerText = this.alunos[i].media();
    }
  }
}

function hideStudents(){
  let tbody = document.getElementById('tbodyShow')
  tbody.innerText = '';
}

async function getStudentSearch(){
  let tbodySearch = document.getElementById("tbodySearch")
  tbodySearch.innerText = ''
  var searchNM = document.getElementById("searchNM").value
  if (alunos.length == 0){
    alert("Não existem alunos cadastrados!")
  }else{
    let student = getStudentByNM(searchNM)
    console.log(student)
    showStudentByTag(tbodySearch, student)
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

function deleteStudent(){
  let deleteNM = document.getElementById('deleteNM').value
  let student = getStudentByNM(deleteNM)

  if(student == undefined){
    console.log("undefined")
  }else{
    for (let i = 0; i < alunos.length; i++){
      if(alunos[i].nm == student[0].nm){
        alunos.splice(i, 1)
        alert('Aluno excluído com sucesso!')
      }
    }
  }
  
}