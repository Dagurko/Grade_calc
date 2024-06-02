function addGradeInput(section) {
    const gradesContainer = document.querySelector(`.${section}-grades .grades`);
    const gradeDiv = document.createElement('div');
    gradeDiv.classList.add('grade-entry');

    gradeDiv.innerHTML = `
        <input type="text" name="${section}-name" placeholder="Enter name...">
        <input type="text" name="${section}-grade" placeholder="Enter grade...">
        <input type="text" name="${section}-weight" placeholder="Enter weight...">
    `;

    gradesContainer.appendChild(gradeDiv);
}



function calculateGrade() {
    const assignments = getGrades('assignment');
    const quizzes = getGrades('quiz');
    const finals = getGrades('final');

    console.log('Assignments:', assignments);
    console.log('Quizzes:', quizzes);
    console.log('Finals:', finals);

    for (grade in assignments) {
        console.log(grade)
    }
   
}



function getGrades(section) {
    const sectionElement = document.querySelector(`.${section}-grades .grades`);
    const gradeEntries = sectionElement.getElementsByClassName('grade-entry');
    const grades = [];

    for (let entry of gradeEntries) {
        const name = entry.querySelector(`input[name="${section}-name"]`).value;
        const grade = parseFloat(entry.querySelector(`input[name="${section}-grade"]`).value);
        const weight = parseFloat(entry.querySelector(`input[name="${section}-weight"]`).value);

        if (name && !isNaN(grade) && !isNaN(weight)) {
            grades.push({ name, grade, weight });
        }
    }

    return grades;
}