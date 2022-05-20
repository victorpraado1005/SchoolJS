var turma = []

function verificaDados(){
  var nome = document.getElementById('nameStudent').value
  var sobrenome = document.getElementById('lastNameStudent').value
  var n1 = document.getElementById('n1').value
  var n2 = document.getElementById('n2').value
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);

  var a = new aluno(nome, sobrenome, n1, n2)
  return turma.push(a)
}

function aluno(nome, sobrenome, n1, n2){
  this.name = nome;
  this.lastName = sobrenome;
  this.n1 = n1;
  this.n2 = n2;
  this.media = function(){
     var resultado = (n1 + n2) / 2;
     return resultado;
  }
}

function mostrarAlunos(){
  let tbody = document.getElementById('tbody')
  tbody.innerText = '';

  for (let i = 0; i < turma.length; i++) {
    let tr = tbody.insertRow();

    let td_nome = tr.insertCell();
    let td_sobrenome = tr.insertCell();
    let td_n1 = tr.insertCell();
    let td_n2 = tr.insertCell();

    td_nome.innerText = this.turma[i].name;
    td_sobrenome.innerText = this.turma[i].lastName;
    td_n1.innerText = this.turma[i].n1;
    td_n2.innerText = this.turma[i].n2;
  }
}

function esconderAlunos(){
  let tbody = document.getElementById('tbody')
  tbody.innerText = '';
}