// Función cityHash: Implementa un algoritmo de hash simple inspirado en CityHash.
// Parámetros:
// - key: Cadena de entrada que se va a hashear.
// Retorna:
// - Un valor hash de 32 bits sin signo.
function cityHash(key) {
    // Inicializa el hash en 0.
    let hash = 0;

    // Itera sobre cada carácter de la cadena de entrada.
    for (let i = 0; i < key.length; i++) {
        // Actualiza el hash utilizando una combinación de multiplicación y suma.
        // - hash * 31: Multiplica el hash actual por 31 (un número primo común en algoritmos de hash).
        // - key.charCodeAt(i): Obtiene el código ASCII del carácter actual.
        // - >>> 0: Asegura que el resultado sea un número entero sin signo de 32 bits.
        hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }

    // Retorna el valor hash calculado.
    return hash;
}

// Función calcularCityHash: Calcula el hash de una cadena ingresada por el usuario y muestra el resultado en el HTML.
// Esta función se llama desde el HTML cuando el usuario hace clic en un botón.
function calcularCityHash() {
    // Obtiene el valor del campo de texto con id "cityInput".
    const input = document.getElementById("cityInput").value;

    // Calcula el hash de la cadena ingresada utilizando la función cityHash.
    const hash = cityHash(input);

    // Muestra el resultado en el elemento con id "cityResult".
    // - hash.toString(16): Convierte el hash a una cadena hexadecimal.
    document.getElementById("cityResult").innerText = "CityHash: " + hash.toString(16);
}