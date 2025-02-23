// Función mdaHash: Calcula el hash de una cadena utilizando el algoritmo especificado.
// Parámetros:
// - key: Cadena de entrada que se va a hashear.
// - algorithm: Algoritmo de hash a utilizar (por defecto es 'MD5').
// Retorna:
// - El hash calculado como una cadena hexadecimal.
function mdaHash(key, algorithm = 'MD5') {
    // Selecciona el algoritmo de hash según el parámetro.
    switch (algorithm.toLowerCase()) {
        case 'md5':
            // Calcula el hash MD5 utilizando CryptoJS.
            return CryptoJS.MD5(key).toString();
        case 'sha1':
            // Calcula el hash SHA-1 utilizando CryptoJS.
            return CryptoJS.SHA1(key).toString();
        case 'sha256':
            // Calcula el hash SHA-256 utilizando CryptoJS.
            return CryptoJS.SHA256(key).toString();
        default:
            // Lanza un error si el algoritmo no es soportado.
            throw new Error("Algoritmo no soportado");
    }
}

// Función calcularMDAHash: Calcula el hash de una cadena ingresada por el usuario y muestra el resultado en el HTML.
// Esta función se llama desde el HTML cuando el usuario hace clic en un botón.
function calcularMDAHash() {
    try {
        // Obtiene el valor del campo de texto con id "mdaInput".
        const input = document.getElementById("mdaInput").value;

        // Obtiene el algoritmo seleccionado en el menú desplegable con id "mdaAlgorithm".
        const algorithm = document.getElementById("mdaAlgorithm").value;

        // Calcula el hash de la cadena ingresada utilizando la función mdaHash.
        const hash = mdaHash(input, algorithm);

        // Muestra el resultado en el elemento con id "mdaResult".
        // - algorithm.toUpperCase(): Convierte el nombre del algoritmo a mayúsculas.
        // - hash: El hash calculado en formato hexadecimal.
        document.getElementById("mdaResult").innerText = "MDA (" + algorithm.toUpperCase() + "): " + hash;
    } catch (error) {
        // Si hay un error, lo muestra en la consola y en el HTML.
        console.error("Error al calcular el hash:", error);
        document.getElementById("mdaResult").innerText = "Error: " + error.message;
    }
}