// Función xxHash: Implementa un algoritmo de hash rápido inspirado en XXHash.
// Parámetros:
// - key: Cadena de entrada que se va a hashear.
// - seed: Valor semilla para inicializar el hash (por defecto es 0).
// Retorna:
// - Un valor hash de 32 bits sin signo.
function xxHash(key, seed = 0) {
    // Constantes del algoritmo XXHash:
    const PRIME1 = 2654435761; // Constante de mezcla 1
    const PRIME2 = 2246822519; // Constante de mezcla 2
    const PRIME3 = 3266489917; // Constante de mezcla 3
    const PRIME4 = 668265263;  // Constante de mezcla 4
    const PRIME5 = 0x165667b1; // Constante de mezcla 5

    // Inicializa el hash con la semilla y la constante PRIME5.
    let hash = seed + PRIME5;

    // Longitud de la cadena de entrada.
    let len = key.length;

    // Índice para iterar sobre la cadena.
    let i = 0;

    // Procesa la cadena en bloques de 4 bytes (32 bits).
    while (len >= 4) {
        // Combina 4 caracteres en un solo valor de 32 bits.
        let chunk = key.charCodeAt(i) | (key.charCodeAt(i + 1) << 8) | (key.charCodeAt(i + 2) << 16) | (key.charCodeAt(i + 3) << 24);

        // Mezcla el bloque con PRIME1.
        chunk = Math.imul(chunk, PRIME1);

        // Rota el bloque 13 bits a la izquierda.
        chunk = (chunk << 13) | (chunk >>> 19);

        // Mezcla el bloque con PRIME2.
        chunk = Math.imul(chunk, PRIME2);

        // Aplica XOR entre el hash y el bloque procesado.
        hash ^= chunk;

        // Rota el hash 17 bits a la izquierda.
        hash = (hash << 17) | (hash >>> 15);

        // Mezcla el hash con PRIME3 y suma PRIME4.
        hash = Math.imul(hash, PRIME3) + PRIME4;

        // Avanza el índice y reduce la longitud restante.
        i += 4;
        len -= 4;
    }

    // Procesa los caracteres restantes (menos de 4 bytes).
    while (len > 0) {
        // Aplica XOR entre el hash y el carácter actual (desplazado 8 bits).
        hash ^= key.charCodeAt(i) << 8;

        // Mezcla el hash con PRIME5.
        hash = Math.imul(hash, PRIME5);

        // Avanza el índice y reduce la longitud restante.
        i++;
        len--;
    }

    // Mezcla final con la longitud de la cadena.
    hash ^= key.length;

    // Mezcla adicional para mejorar la distribución del hash.
    hash ^= hash >>> 15;
    hash = Math.imul(hash, PRIME2);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, PRIME3);
    hash ^= hash >>> 16;

    // Asegura que el hash sea un número entero sin signo de 32 bits.
    return hash >>> 0;
}

// Función calcularXXHash: Calcula el hash XXHash de una cadena ingresada por el usuario y muestra el resultado en el HTML.
// Esta función se llama desde el HTML cuando el usuario hace clic en un botón.
function calcularXXHash() {
    // Obtiene el valor del campo de texto con id "xxInput".
    const input = document.getElementById("xxInput").value;

    // Calcula el hash de la cadena ingresada utilizando la función xxHash.
    const hash = xxHash(input);

    // Muestra el resultado en el elemento con id "xxResult".
    // - hash.toString(16): Convierte el hash a una cadena hexadecimal.
    document.getElementById("xxResult").innerText = "XXHash: " + hash.toString(16);
}