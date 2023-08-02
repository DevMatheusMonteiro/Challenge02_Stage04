const students = [];

let id = 1;
let option;

function addStudents(students, name, scores) {
  const student = {};

  student.id = id;
  id++;

  student.name = name;

  student.scores = scores;

  students.push(student);
}

function deleteStudent(students) {
  alert("Escolha um(a) aluno(a) para deletar");

  let student = searchStudent(students);

  for (let index = 0; index < students.length; index++) {
    const element = students[index];
    if (element == student) {
      alert(`Deletando aluno(a) ${student.name}`);
      students.splice(index, 1);
    }
  }
}

function displayStudentList(students) {
  let list = "";
  let toFixedScore = "";

  for (let index = 0; index < students.length; index++) {
    const student = students[index];

    let id = student.id;
    let name = student.name;
    let scores = student.scores;

    for (let index = 0; index < scores.length; index++) {
      let score = scores[index];

      let lastScore = scores.length - 1;

      if (index < lastScore) {
        toFixedScore += score.toFixed(2).replace(".", ",") + " - ";
      } else {
        toFixedScore += score.toFixed(2).replace(".", ",");
      }
    }

    let lastStudent = students.length - 1;

    if (index < lastStudent) {
      list += `ID: ${id} - Nome: ${name} - Notas: ${toFixedScore}\n`;
    } else {
      list += `ID: ${id} - Nome: ${name} - Notas: ${toFixedScore}`;
    }
    toFixedScore = "";
  }

  return list;
}

function calculateAverage(student) {
  let name = student.name;
  let scores = student.scores;

  let total = 0;

  for (const score of scores) {
    total += score;
  }

  let media = total / scores.length;

  if (media >= 7) {
    return `Parabéns ${name}\nSua média foi ${media
      .toFixed(2)
      .replace(".", ",")} - Você foi aprovado(a) no concurso!`;
  } else {
    return `Não foi dessa vez ${name}\nSua média foi ${media
      .toFixed(2)
      .replace(".", ",")} - Tente na próxima`;
  }
}

function searchStudent(students) {
  let keepSearching = true;
  let studentFound;
  let chosenId;

  while (keepSearching) {
    chosenId = Number(
      prompt(
        `\r${displayStudentList(students)} 
        \rInforme o ID do(a) estudante`
      )
    );

    for (let index = 0; index < students.length; index++) {
      const student = students[index];

      let id = student.id;

      let lastStudent = students.length - 1;

      if (isNaN(chosenId)) {
        alert("O ID é numérico. Informe um valor numérico válido!");
        break;
      } else if (id != chosenId) {
        if (index == lastStudent) {
          alert("Estudante não encontrado, tente novamente!");
        } else {
          continue;
        }
      } else {
        studentFound = student;
        keepSearching = false;
        break;
      }
    }
  }
  return studentFound;
}

while (option != 5) {
  option = Number(
    prompt(
      `Escolha uma opção:
        \r1 - Incluir estudante
        \r2 - Ver lista de estudantes
        \r3 - Calcular média
        \r4 - Deletar aluno
        \r5 - Encerrar programa`
    )
  );

  switch (option) {
    case 1:
      let name = "";
      while (name == "") {
        name = prompt(
          `\rIncluindo estudante...
          \rInforme o nome do estudante`
        );

        if (name == "") {
          alert("Preencha o nome do(a) estudante!");
        }
      }

      let score;
      let scores = [];

      let counter = 1;

      while (counter <= 2) {
        score = prompt(
          `\rIncluindo estudante...
            \rInforme a ${counter}º nota do aluno(a)`
        );

        if (isNaN(Number(score)) == false) {
          if (Number(score) < 0 || Number(score) > 10) {
            alert("A nota deve ser entre 0 e 10");
          } else if (score == "") {
            alert("Preencha a nota do(a) estudante");
          } else {
            scores.push(Number(score));
            counter++;
          }
        } else {
          alert("Informe um valor numérico válido!");
        }
      }

      addStudents(students, name, scores);
      break;
    case 2:
      if (students.length == 0) {
        alert("Lista de estudantes vazia!");
      } else {
        alert("Lista de Estudantes\n" + displayStudentList(students));
      }
      break;
    case 3:
      if (students.length == 0) {
        alert("Lista de estudantes vazia!");
      } else {
        alert("Escolha um(a) aluno(a) para ver a sua média");

        let student = searchStudent(students);

        alert(`${calculateAverage(student)}`);
      }

      break;
    case 4:
      if (students.length == 0) {
        alert("Lista de estudantes vazia!");
      } else {
        deleteStudent(students);
      }

      break;
    case 5:
      alert("Programa encerrado!");

      break;
    default:
      alert("Opção inválida. Tente novamente!");

      break;
  }
}
