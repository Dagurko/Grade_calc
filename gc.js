let currentGrade = 0;
let gradeNeeded = false;
let weight_total = 0;
let rounded = false;
let factor = 1;

function addGradeInput(section) {
    const gradesContainer = document.querySelector(`.${section}-grades .grades`);
    const gradeDiv = document.createElement('div');
    gradeDiv.classList.add('grade-entry');

    gradeDiv.innerHTML = `
        <input type="text" name="${section}-name" placeholder="Enter name...">
        <input type="text" name="${section}-grade" placeholder="Enter grade...">
        <div class="weight-input-container">
            <input type="text" name="${section}-weight" placeholder="Enter weight...">
            <span class="weight-unit">%</span>
        </div>
        <button class="remove-button" onclick="removeGradeInput(this)">Remove</button>
    `;

    gradesContainer.appendChild(gradeDiv);
}

function removeGradeInput(button) {
    const gradeDiv = button.parentElement;
    gradeDiv.remove();
}

function calcGradeNeeded() {
    gradeNeeded = true;
    calculateGrade();
}

function rounding() {
    document.getElementById('round-button').textContent = rounded ? 'Round' : 'Exact';
    rounded = !rounded;
    if (weight_total == 100) {
        calculateGrade();
    }
}

function calculateGrade() {
    const assignments = getGrades('assignment');
    const quizzes = getGrades('quiz');
    const exams = getGrades('exam');
    console.log('Assignments:', assignments);
    console.log('Quizzes:', quizzes);
    console.log('Exams:', exams);

    if (assignments.includes('Invalid') || quizzes.includes('Invalid') || exams.includes('Invalid')) {
        return;
    }
    else if (assignments.length === 0 && quizzes.length === 0 && exams.length === 0) {
        alert("No grades entered");
        return;
    }
    let ass_grade = 0;
    let quiz_grade = 0;
    let exam_grade = 0;
    weight_total = 0;

    for (ass of assignments) {
        if (ass.grade > 10) {
            ass.grade= ass.grade / 10;
        }
        weight_total += parseFloat(ass.weight);
        ass_grade += parseFloat(ass.grade) * parseFloat(ass.weight);
    }
    for (quiz of quizzes) {
        if (quiz.grade > 10 ) {
            quiz.grade= quiz.grade / 10;
        }
        weight_total += parseFloat(quiz.weight);
        quiz_grade += parseFloat(quiz.grade) * parseFloat(quiz.weight);
    }
    for (exam of exams) {
        if (exam.grade > 10 ) {
            exam.grade= exam.grade / 10;
        }
        weight_total += parseFloat(exam.weight);
        exam_grade += parseFloat(exam.grade) * parseFloat(exam.weight);
    }

    if (weight_total !== 100) {
        if (gradeNeeded == true) {
            currentGrade = (4.75 * 100 - (ass_grade + quiz_grade + exam_grade)) / (100 - weight_total);
            console.log(currentGrade);
            displayGrade(currentGrade, factor); 
            gradeNeeded = false;
            return;
        }
        alert('Total weight does not add up to 100');
        console.log(weight_total);
    } 
    else if (weight_total == 100 && gradeNeeded == true) {
        alert('Total weight adds up to 100');
        gradeNeeded = false;
    }
    else {
        currentGrade = (ass_grade + quiz_grade + exam_grade)/100;
        console.log(currentGrade);
        displayGrade(currentGrade, factor); 
    }
}

function displayGrade(grade, factor) {
    if (gradeNeeded == true) {
        if (grade < 0) {
            document.getElementById('number-grade').textContent = 'You do not have to take the test to pass :)';
            document.getElementById('letter-grade').textContent = '';
            return;
        }
        if (grade > 10) {
            document.getElementById('number-grade').textContent = 'You cannot pass :(';
            document.getElementById('letter-grade').textContent = '';
            return;
        } 
    }
    if (rounded == true) {
        grade = round_it(grade)
    }
    document.getElementById('number-grade').textContent = (grade * factor).toFixed(2);
    document.getElementById('letter-grade').textContent = number_to_letter(grade*10);
}

function round_it(grade) {
    grade = Math.round(grade * 10) / 10;
    console.log(grade);
    grade = Math.round((grade) * 2) / 2;
    console.log(grade);
    return grade;
}

function changeFormat(factorc) {
    factor = factorc;
    if (currentGrade == 0) {
        return;
    }
    displayGrade(currentGrade, factorc);
}

function number_to_letter(grade) {
    if (grade >= 90) return '  A';
    else if (grade >= 80) return '  B';
    else if (grade >= 70) return '  C';
    else if (grade >= 60) return '  D';
    else return '  F';
}

function reset() {
    const inputs = document.querySelectorAll('.input-box input');
    inputs.forEach(input => input.value = '');

    currentGrade = 0;
    document.getElementById('number-grade').textContent = '';
    document.getElementById('letter-grade').textContent = '';
}

function getGrades(section) {
    const sectionElement = document.querySelector(`.${section}-grades .grades`);
    const gradeEntries = sectionElement.getElementsByClassName('grade-entry');
    const grades = [];

    for (let entry of gradeEntries) {
        let name = entry.querySelector(`input[name="${section}-name"]`).value;
        let gradeInput = entry.querySelector(`input[name="${section}-grade"]`);
        let weightInput = entry.querySelector(`input[name="${section}-weight"]`);

        if (!gradeInput || !weightInput) {
            continue; 
        }
        
        let grade = gradeInput.value.trim();
        let weight = parseFloat(weightInput.value);

        if (grade.includes('/')) {
            const [numerator, denominator] = grade.split('/').map(Number);
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                grade = (numerator / denominator) * 10; 
            } else {
                alert('Invalid fraction format. Please enter as numerator/denominator.');
                return ['Invalid'];
            }
        } else {
            grade = parseFloat(grade);
        }

        if (!isNaN(grade) && !isNaN(weight)) {
            grades.push({ name, grade, weight });
        }
    }

    return grades;
}

