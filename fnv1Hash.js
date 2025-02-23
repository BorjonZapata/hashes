// Función fnv1Hash: Implementa el algoritmo de hash FNV-1 (Fowler–Noll–Vo).
// Parámetros:
// - key: Cadena de entrada que se va a hashear.
// Retorna:
// - Un valor hash de 32 bits sin signo.
function fnv1Hash(key) {
    // Constantes del algoritmo FNV-1:
    const FNV_PRIME = 16777619;      // Número primo utilizado en el cálculo del hash.
    const OFFSET_BASIS = 2166136261; // Valor inicial (offset) del hash.

    // Inicializa el hash con el valor OFFSET_BASIS.
    let hash = OFFSET_BASIS;

    // Itera sobre cada carácter de la cadena de entrada.
    for (let i = 0; i < key.length; i++) {
        // Multiplica el hash actual por FNV_PRIME.
        // Math.imul realiza una multiplicación de enteros de 32 bits.
        hash = Math.imul(hash, FNV_PRIME);

        // Aplica XOR entre el hash y el código ASCII del carácter actual.
        hash ^= key.charCodeAt(i);
    }

    // Asegura que el hash sea un número entero sin signo de 32 bits.
    return hash >>> 0;
}

// Función calcularFNV1Hash: Calcula el hash FNV-1 de una cadena ingresada por el usuario y muestra el resultado en el HTML.
// Esta función se llama desde el HTML cuando el usuario hace clic en un botón.
function calcularFNV1Hash() {
    // Obtiene el valor del campo de texto con id "fnv1Input".
    const input = document.getElementById("fnv1Input").value;

    // Calcula el hash de la cadena ingresada utilizando la función fnv1Hash.
    const hash = fnv1Hash(input);

    // Muestra el resultado en el elemento con id "fnv1Result".
    // - hash.toString(16): Convierte el hash a una cadena hexadecimal.
    document.getElementById("fnv1Result").innerText = "FNV-1: " + hash.toString(16);
}