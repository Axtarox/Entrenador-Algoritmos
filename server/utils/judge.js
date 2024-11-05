const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports.evaluate = async (userCode, expectedSolution) => {
    // Ruta del archivo temporal donde se guardará el código del usuario
    const tempFilePath = path.join(__dirname, 'tempUserCode.js');
    
    try {
        // Guardar el código del usuario en un archivo temporal
        fs.writeFileSync(tempFilePath, userCode);

        // Ejecutar el archivo temporal en un subproceso y obtener la salida
        const userOutput = await executeCode(tempFilePath);

        // Comparar la salida con la solución esperada
        const isCorrect = userOutput.trim() === expectedSolution.trim();
        
        // Eliminar el archivo temporal después de ejecutar
        fs.unlinkSync(tempFilePath);

        return isCorrect ? "Correcto" : `Incorrecto, salida obtenida: ${userOutput}`;
    } catch (error) {
        // Eliminar el archivo temporal en caso de error
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
        
        return `Error en el código: ${error.message}`;
    }
};

// Función que ejecuta el código en un subproceso
function executeCode(filePath) {
    return new Promise((resolve, reject) => {
        exec(`node ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || stdout || error.message);
            } else {
                resolve(stdout);
            }
        });
    });
}
