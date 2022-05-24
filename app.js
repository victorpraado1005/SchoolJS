var alunos = []

function verificaDados(){
  var nome = document.getElementById('nameStudent').value
  var sobrenome = document.getElementById('lastNameStudent').value
  var n1 = document.getElementById('n1').value
  var n2 = document.getElementById('n2').value
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  var turma = getClass()
  var a = new aluno(nome, sobrenome, n1, n2, turma)
  clearInput()
  return alunos.push(a)  
}

function getClass(){
  var select = document.getElementById('turma')
  return select.options[select.selectedIndex].value
}

function aluno(nome, sobrenome, n1, n2, turma){
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

function mostrarAlunos(){
  let tbody = document.getElementById('tbody')
  tbody.innerText = '';
  var select = document.getElementById('turmaVisualizar')
  var turmaVisualizar = select.options[select.selectedIndex].value

  for (let i = 0; i < alunos.length; i++) {
    if(alunos[i].turma == turmaVisualizar){
      let tr = tbody.insertRow();

      let td_nome = tr.insertCell();
      let td_sobrenome = tr.insertCell();
      let td_n1 = tr.insertCell();
      let td_n2 = tr.insertCell();
      let td_media = tr.insertCell();

      td_nome.innerText = this.alunos[i].name;
      td_sobrenome.innerText = this.alunos[i].lastName;
      td_n1.innerText = this.alunos[i].n1;
      td_n2.innerText = this.alunos[i].n2;
      td_media.innerText = this.alunos[i].media();
    }
  }
  }

  function verificaTamanhoTurma(turma){
    
  }

  function clearInput(){
    document.getElementById('nameStudent').value='';
    document.getElementById('lastNameStudent').value='';
    document.getElementById('n1').value='';
    document.getElementById('n2').value='';
  }

  function hideStudents(){
    let tbody = document.getElementById('tbody')
    tbody.innerText = '';
  }