var turma = []

function criarAluno(){
  var name = document.getElementById('nameStudent').value
  var lastName = document.getElementById('lastNameStudent').value
  var n1 = document.getElementById('n1').value
  var n2 = document.getElementById('n2').value

  var aluno = {
    name : name,
    lastName : lastName,
    n1 : n1,
    n2 : n2,
    media : function(){
      return (n1 + n2) / 2;
    }
  }
  return turma.push(aluno)
}