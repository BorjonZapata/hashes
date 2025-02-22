function sha1(message) {
    function rotateLeft(n, s) {
        return (n << s) | (n >>> (32 - s));
    }
    
    function toHexStr(n) {
        let s = "", v;
        for (let i = 7; i >= 0; i--) {
            v = (n >>> (i * 4)) & 0x0F;
            s += v.toString(16);
        }
        return s;
    }

    // Convertir el mensaje a un array de palabras de 32 bits
    let msg = unescape(encodeURIComponent(message));
    let msgLength = msg.length;
    let wordArray = [];
    
    for (let i = 0; i < msgLength; i++) {
        wordArray[i >> 2] |= msg.charCodeAt(i) << ((3 - (i % 4)) * 8);
    }
    
    // Agregar bit de terminación
    wordArray[msgLength >> 2] |= 0x80 << ((3 - (msgLength % 4)) * 8);
    
    // Agregar longitud en bits como un entero de 64 bits
    wordArray[((msgLength + 8) >> 6) * 16 + 15] = msgLength * 8;

    console.log("Array de palabras después de agregar la longitud:", wordArray);
    
    // Inicializar valores hash
    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;
    
    // Procesar en bloques de 512 bits
    for (let i = 0; i < wordArray.length; i += 16) {
        let w = new Array(80);
        for (let j = 0; j < 16; j++) {
            w[j] = wordArray[i + j] | 0;
        }
        
        for (let j = 16; j < 80; j++) {
            w[j] = rotateLeft(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
        }
        
        let a = h0, b = h1, c = h2, d = h3, e = h4;
        
        for (let j = 0; j < 80; j++) {
            let f, k;
            if (j < 20) {
                f = (b & c) | (~b & d);
                k = 0x5A827999;
            } else if (j < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            } else if (j < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            } else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            let temp = (rotateLeft(a, 5) + f + e + k + w[j]) | 0;
            e = d;
            d = c;
            c = rotateLeft(b, 30);
            b = a;
            a = temp;

            console.log(`Iteración ${j}:`, { a, b, c, d, e });
        }
        
        h0 = (h0 + a) | 0;
        h1 = (h1 + b) | 0;
        h2 = (h2 + c) | 0;
        h3 = (h3 + d) | 0;
        h4 = (h4 + e) | 0;
    }
    
    // Concatenar los valores hash en una cadena hexadecimal
    return toHexStr(h0) + toHexStr(h1) + toHexStr(h2) + toHexStr(h3) + toHexStr(h4);
}

// Prueba
console.log("Inicio SHA-1");
console.log("Resultado SHA-1: ", sha1("Hola mundo"));