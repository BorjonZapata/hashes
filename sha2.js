// Constantes de inicialización (valores de la raíz cuadrada de los primeros 8 primos)
const HH = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
];

// Constantes de redondeo (fracciones de las raíces cúbicas de los primeros 64 primos)
const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

// Funciones auxiliares
const ROTR = (n, x) => (x >>> n) | (x << (32 - n));
const Ch = (x, y, z) => (x & y) ^ (~x & z);
const Maj = (x, y, z) => (x & y) ^ (x & z) ^ (y & z);
const Sigma0 = x => ROTR(2, x) ^ ROTR(13, x) ^ ROTR(22, x);
const Sigma1 = x => ROTR(6, x) ^ ROTR(11, x) ^ ROTR(25, x);
const sigma0 = x => ROTR(7, x) ^ ROTR(18, x) ^ (x >>> 3);
const sigma1 = x => ROTR(17, x) ^ ROTR(19, x) ^ (x >>> 10);

// Función de padding
function padMessage(message) {
    const m = new TextEncoder().encode(message);
    const bitLen = m.length * 8;
    const k = (447 - bitLen) % 512;
    const padding = new Uint8Array(((bitLen + k + 65) / 8) | 0);
    padding.set(m);
    padding[m.length] = 0x80;
    new DataView(padding.buffer).setUint32(padding.length - 4, bitLen, false);
    return new Uint32Array(padding.buffer);
}

// Procesamiento del mensaje
function sha256(message) {
    let M = padMessage(message);
    let state = [...HH];
    
    for (let i = 0; i < M.length / 16; i++) {
        let W = new Uint32Array(64);
        W.set(M.slice(i * 16, (i + 1) * 16));
        
        for (let t = 16; t < 64; t++) {
            W[t] = (sigma1(W[t - 2]) + W[t - 7] + sigma0(W[t - 15]) + W[t - 16]) >>> 0;
        }
        
        let [a, b, c, d, e, f, g, h] = state;
        
        for (let t = 0; t < 64; t++) {
            let T1 = (h + Sigma1(e) + Ch(e, f, g) + K[t] + W[t]) >>> 0;
            let T2 = (Sigma0(a) + Maj(a, b, c)) >>> 0;
            h = g;
            g = f;
            f = e;
            e = (d + T1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (T1 + T2) >>> 0;
        }
        
        state = state.map((v, i) => (v + [a, b, c, d, e, f, g, h][i]) >>> 0);
    }
    
    return state.map(x => x.toString(16).padStart(8, '0')).join('');
}

function getSHA2Hash() {
    const input = document.getElementById("sha2Input").value;
    const hash = sha256(input);
    document.getElementById("sha2Result").innerText = "SHA2 Hash: " + hash;
}