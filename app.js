document.addEventListener('DOMContentLoaded', function () {
    const subjectForm = document.getElementById('subject-form');
    const selectedSubjectsContainer = document.getElementById('asignaturas-seleccionadas');
    const searchButton = document.getElementById('search-button');

    subjectForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const matricula = document.getElementById('matricula').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const asignaturasSeleccionadas = getSelectedSubjects();

        if (asignaturasSeleccionadas.length === 0) {
            alert('Por favor, selecciona al menos una asignatura.');
            return;
        }

        saveStudentData(matricula, nombre, asignaturasSeleccionadas);

        subjectForm.reset();

        displaySelectedSubjects(matricula);
    });

    searchButton.addEventListener('click', function () {
        const searchMatricula = document.getElementById('search-matricula').value.trim();
        if (searchMatricula !== '') {
            displaySelectedSubjects(searchMatricula, true);
        } else {
            alert('Ingresa una matrícula para realizar la búsqueda.');
        }
    });

    function getSelectedSubjects() {
        const asignaturaSelect = document.getElementById('asignatura');
        return Array.from(asignaturaSelect.options)
            .filter(option => option.selected)
            .map(option => option.value);
    }

    function saveStudentData(matricula, nombre, asignaturas) {
        const studentData = {
            matricula: matricula,
            nombre: nombre,
            asignaturas: asignaturas
        };

        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(studentData);
        localStorage.setItem('students', JSON.stringify(students));
    }

    function displaySelectedSubjects(matricula, isSearch = false) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students.find(s => s.matricula === matricula);
        const resultContainer = document.getElementById(isSearch ? 'search-result' : 'asignaturas-seleccionadas');

        if (student) {
            const message = `<p>Asignaturas seleccionadas para ${student.nombre} (${student.matricula}):</p>`;
            const subjectList = `<ul>${student.asignaturas.map(subject => `<li>${subject}</li>`).join('')}</ul>`;
            resultContainer.innerHTML = message + subjectList;
        } else {
            resultContainer.innerHTML = '<p>No se encontraron datos para la matrícula ingresada.</p>';
        }
    }
});
