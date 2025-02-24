function sha0(message) {
    // Convertir el mensaje a una secuencia de bytes
    let msg = new TextEncoder().encode(message);
    let length = msg.length * 8; // Longitud en bits
    
    console.log("Longitud del mensaje en bits:", length);
    
    // Paso 1: Padding (relleno del mensaje)
    msg = [...msg, 0x80]; // Agregar bit 1 seguido de ceros
    while ((msg.length * 8) % 512 !== 448) {
        msg.push(0x00); // Rellenar con ceros hasta alcanzar 448 bits
    }
    
    console.log("Mensaje después del padding:", msg);
    
    // Agregar la longitud original del mensaje en 64 bits
    let lengthBits = new Array(8).fill(0);
    for (let i = 0; i < 8; i++) {
        lengthBits[7 - i] = (length >>> (i * 8)) & 0xff;
    }
    msg = msg.concat(lengthBits);
    
    console.log("Mensaje después de agregar la longitud:", msg);
    
    // Convertir el mensaje en bloques de 512 bits
    let blocks = [];
    for (let i = 0; i < msg.length; i += 64) {
        blocks.push(msg.slice(i, i + 64));
    }
    
    console.log("Bloques de 512 bits:", blocks);
    
    // Inicializar valores hash (H0 - H4)
    let H = [
        0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0
    ];
    
    console.log("Valores iniciales de hash:", H);
    
    // Procesar cada bloque
    for (let block of blocks) {
        let W = new Array(80);
        
        // Dividir el bloque en palabras de 32 bits
        for (let i = 0; i < 16; i++) {
            W[i] = (block[i * 4] << 24) | (block[i * 4 + 1] << 16) | (block[i * 4 + 2] << 8) | (block[i * 4 + 3]);
        }
        
        // Expansión del mensaje
        for (let i = 16; i < 80; i++) {
            W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        }
        
        console.log("Palabras expandidas W:", W);
        
        let [a, b, c, d, e] = H;
        
        for (let i = 0; i < 80; i++) {
            let f, k;
            if (i < 20) {
                f = (b & c) | (~b & d);
                k = 0x5A827999;
            } else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            } else if (i < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            } else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            
            let temp = ((a << 5) | (a >>> 27)) + f + e + k + W[i];
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = temp;
            
            console.log(`Iteración ${i}:`, { a, b, c, d, e });
        }
        
        H[0] += a;
        H[1] += b;
        H[2] += c;
        H[3] += d;
        H[4] += e;
    }
    
    // Convertir a hex
    let hash = H.map(h => ('00000000' + h.toString(16)).slice(-8)).join('');
    return hash;
}

function getSHA0Hash() {
    const input = document.getElementById("sha0Input").value;
    const hash = sha0(input);
    document.getElementById("sha0Result").innerText = "SHA0 Hash: " + hash;
}