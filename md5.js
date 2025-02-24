// Rota los bits de un número hacia la izquierda
function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
}

// Funciones auxiliares utilizadas en los pasos de transformación
function F(x, y, z) { return (x & y) | (~x & z); }
function G(x, y, z) { return (x & z) | (y & ~z); }
function H(x, y, z) { return x ^ y ^ z; }
function I(x, y, z) { return y ^ (x | ~z); }

// Convertir un string en un array de palabras de 32 bits
function convertToWordArray(str) {
    let lWordCount;
    const lMessageLength = str.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64 + 1;
    const lNumberOfWords = lNumberOfWords_temp2 * 16;
    const wordArray = Array(lNumberOfWords - 1);
    
    let lBytePosition = 0;
    for (let i = 0; i < lMessageLength; i++) {
        const lWordCount = (i - (i % 4)) / 4;
        lBytePosition = (i % 4) * 8;
        wordArray[lWordCount] |= str.charCodeAt(i) << lBytePosition;
    }
    
    const lWordCountFinal = (lMessageLength - (lMessageLength % 4)) / 4;
    lBytePosition = (lMessageLength % 4) * 8;
    wordArray[lWordCountFinal] |= 0x80 << lBytePosition;
    wordArray[lNumberOfWords - 2] = lMessageLength << 3;
    wordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    
    console.log("Palabras después de la conversión:", wordArray);
    return wordArray;
}

// Función principal de MD5
function md5(str) {
    const x = convertToWordArray(str);
    
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    
    for (let k = 0; k < x.length; k += 16) {
        const aa = a, bb = b, cc = c, dd = d;

        a = rotateLeft(a + F(b, c, d) + x[k] + 0xD76AA478, 7) + b;
        d = rotateLeft(d + F(a, b, c) + x[k + 1] + 0xE8C7B756, 12) + a;
        c = rotateLeft(c + F(d, a, b) + x[k + 2] + 0x242070DB, 17) + d;
        b = rotateLeft(b + F(c, d, a) + x[k + 3] + 0xC1BDCEEE, 22) + c;
        
        // Solo una pequeña parte de la transformación, en un MD5 completo hay 64 pasos
        
        a += aa; b += bb; c += cc; d += dd;
    }
    
    console.log("Valores finales:", a.toString(16), b.toString(16), c.toString(16), d.toString(16));
    return (a.toString(16) + b.toString(16) + c.toString(16) + d.toString(16)).padStart(32, '0');
}


function getMD5Hash() {
    const input = document.getElementById("md5Input").value;
    const hash = md5(input);
    document.getElementById("md5Result").innerText = "MD5 Hash: " + hash.toString(16);
}