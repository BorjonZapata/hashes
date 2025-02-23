// Función murmurHash: Implementa el algoritmo MurmurHash, un hash no criptográfico rápido y eficiente.
// Parámetros:
// - key: Cadena de entrada que se va a hashear.
// - seed: Valor semilla para inicializar el hash (por defecto es 0).
function murmurHash(key, seed = 0) {
    // Constantes utilizadas en el algoritmo MurmurHash
    const c1 = 0xcc9e2d51; // Constante de mezcla 1
    const c2 = 0x1b873593; // Constante de mezcla 2
    const r1 = 15;         // Cantidad de rotación 1
    const r2 = 13;         // Cantidad de rotación 2
    const m = 5;           // Multiplicador
    const n = 0xe6546b64;  // Constante de ajuste

    // Inicializa el hash con la semilla
    let hash = seed;
    // Longitud de la cadena de entrada
    let len = key.length;
    // Variable temporal para almacenar el valor procesado de cada carácter
    let k;

    // Itera sobre cada carácter de la cadena de entrada
    for (let i = 0; i < len; i++) {
        // Obtiene el código ASCII del carácter actual
        k = key.charCodeAt(i);
        // Mezcla el valor con la constante c1
        k = Math.imul(k, c1);
        // Rota el valor a la izquierda por r1 bits
        k = (k << r1) | (k >>> (32 - r1));
        // Mezcla el valor con la constante c2
        k = Math.imul(k, c2);

        // Aplica XOR al hash con el valor procesado
        hash ^= k;
        // Rota el hash a la izquierda por r2 bits
        hash = (hash << r2) | (hash >>> (32 - r2));
        // Mezcla el hash con el multiplicador y suma la constante n
        hash = Math.imul(hash, m) + n;
    }

    // Mezcla final con la longitud de la cadena
    hash ^= len;
    // Mezcla adicional para mejorar la distribución del hash
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;

    // Devuelve el hash como un número entero sin signo de 32 bits
    return hash >>> 0;
}

// Función calcularMurmurHash: Calcula el MurmurHash de una cadena ingresada por el usuario y muestra el resultado.
// Esta función se llama desde el HTML cuando el usuario hace clic en un botón.
function calcularMurmurHash() {
    // Obtiene el valor del campo de texto con id "murmurInput"
    const input = document.getElementById("murmurInput").value;
    // Calcula el MurmurHash de la cadena ingresada
    const hash = murmurHash(input);
    // Muestra el resultado en el elemento con id "murmurResult"
    document.getElementById("murmurResult").innerText = "MurmurHash: " + hash.toString(16);
    // El resultado se muestra en formato hexadecimal (base 16).
}