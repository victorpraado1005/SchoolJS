var alunos = []

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
  let tbody = document.getElementById('tbody')
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
  let tbody = document.getElementById('tbody')
  tbody.innerText = '';
}

const timeout = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

async function getStudent(){
  let tbodySearch = document.getElementById("tbodySearch")
  tbodySearch.innerText = ''
  var searchNM = document.getElementById("searchNM").value
  var controller = false;
  if (alunos.length == 0){
    alert("Não existem alunos cadastrados!")
  }else{
    for(let i = 0; i < alunos.length; i++){
      if(searchNM == alunos[i].nm){
        let trSearch = tbodySearch.insertRow();
  
        let td_nmFound = trSearch.insertCell()
        let td_nameFound = trSearch.insertCell()
        let td_lastNameFound = trSearch.insertCell()
        let td_classFound = trSearch.insertCell()
        let td_n1Found = trSearch.insertCell()
        let td_n2Found = trSearch.insertCell()
        let td_mediaFound = trSearch.insertCell()
        
        td_nmFound.innerText = this.alunos[i].nm
        td_nameFound.innerText = this.alunos[i].name
        td_lastNameFound.innerText = this.alunos[i].lastName
        td_classFound.innerText = this.alunos[i].turma
        td_n1Found.innerText = this.alunos[i].n1
        td_n2Found.innerText = this.alunos[i].n2
        td_mediaFound.innerText = this.alunos[i].media()
        controller = true;
        document.getElementById("searchNM").value=''
      }
    }
    timeout(100)
  .then(function() {
    if(controller == false){
      alert("NM não encontrado!")
      document.getElementById("searchNM").value=''
    }
  })
    }
    
  }

function searchStudent(searchNM, controller){
  

  
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