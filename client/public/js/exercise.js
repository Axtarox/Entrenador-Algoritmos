document.addEventListener('DOMContentLoaded', () => {
    const exerciseTitle = document.getElementById('exerciseTitle');
    const exerciseDescription = document.getElementById('exerciseDescription');
    const codeArea = document.getElementById('codeArea');
    const outputArea = document.getElementById('outputArea');
    const executeButton = document.getElementById('executeButton');
    
    const exerciseId = window.location.pathname.split('/').pop();

    // Función para obtener los detalles del ejercicio desde la base de datos a través de la API
    const getExerciseDetails = async () => {
        try {
            const response = await fetch(`/api/exercises/${exerciseId}`);
            if (!response.ok) {
                throw new Error("Error al obtener los detalles del ejercicio");
            }
            const data = await response.json();
            exerciseTitle.textContent = `Ejercicio ${data.id}: ${data.nombreModulo}`;
            exerciseDescription.textContent = data.enunciado;
        } catch (error) {
            console.error('Error al cargar los detalles del ejercicio:', error);
        }
    };

    // Función para enviar el código del usuario al backend para evaluación
    const evaluateCode = async (userCode) => {
        try {
            const response = await fetch(`/api/exercises/${exerciseId}/evaluate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: userCode })
            });
            if (!response.ok) {
                throw new Error("Error al evaluar el código");
            }
            const result = await response.json();
            outputArea.textContent = result.output;
        } catch (error) {
            outputArea.textContent = `Error: ${error.message}`;
            console.error('Error al evaluar el código:', error);
        }
    };

    // Evento para ejecutar el código ingresado al hacer clic en el botón
    executeButton.addEventListener('click', () => {
        const userCode = codeArea.value;
        evaluateCode(userCode);
    });

    // Cargar los detalles del ejercicio al cargar la página
    getExerciseDetails();
});
