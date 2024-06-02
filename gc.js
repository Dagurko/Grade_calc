function addGradeInput(section) {
    const gradesContainer = document.querySelector(`.${section} .grades`);
    const gradeDiv = document.createElement('div');
    gradeDiv.classList.add('grade-entry');

    gradeDiv.innerHTML = `
        <input type="text" name="name" placeholder="Enter name...">
        <input type="text" name="grade" placeholder="Enter grade...">
        <input type="text" name="weight" placeholder="Enter weight...">
    `;

    gradesContainer.appendChild(gradeDiv);
}

