document.addEventListener('DOMContentLoaded', () => {
    const hashesContainer = document.getElementById('hashes');
    
    const algorithms = [
        { name: 'RIPEMD', func: ripemd },
        { name: 'BLAKE', func: blake },
        { name: 'Whirlpool', func: whirlpool },
        { name: 'Tiger', func: tiger },
        { name: 'Snefru', func: snefru }
    ];

    window.calculateHashes = () => {
        const inputString = document.getElementById('inputString').value;
        hashesContainer.innerHTML = '';

        algorithms.forEach(algorithm => {
            const hash = algorithm.func(inputString);
            const algoDiv = document.createElement('div');
            const algoName = document.createElement('h4');
            algoName.innerText = algorithm.name;
            

            const algoHash = document.createElement('p');
            algoHash.innerText = `${hash}`;
            algoDiv.appendChild(algoHash);

            hashesContainer.appendChild(algoDiv);
        });
    };
});

function ripemd(message) {
    
    function f(j, x, y, z) {
        if (j <= 15) return x ^ y ^ z;
        if (j <= 31) return (x & y) | (~x & z);
        if (j <= 47) return (x | ~y) ^ z;
        if (j <= 63) return (x & z) | (y & ~z);
        return x ^ (y | ~z);
    }
    return `RIPEMD(${message.split('').map(c => c.charCodeAt(0).toString(16)).join('')})`;
}

function blake(message) {
    function G(v, a, b, c, d, x, y) {
        v[a] += v[b] + x;
        v[d] = ROTR(v[d] ^ v[a], 16);
        v[c] += v[d];
        v[b] = ROTR(v[b] ^ v[c], 12);
        v[a] += v[b] + y;
        v[d] = ROTR(v[d] ^ v[a], 8);
        v[c] += v[d];
        v[b] = ROTR(v[b] ^ v[c], 7);
    }
    return `BLAKE(${message.split('').map(c => (c.charCodeAt(0) * 2).toString(16)).join('')})`;
}

function whirlpool(message) {
    function s_box(byte) {
    }
    function mix_columns(state) {
    }
    function shift_rows(state) {
    }
    return `Whirlpool(${message.split('').map(c => (c.charCodeAt(0) ^ 0xAA).toString(16)).join('')})`;
}

function tiger(message) {
    function key_schedule(x) {
    }
    function round(a, b, c, x, m) {
        a -= (b ^ c ^ x);
        b += (c ^ x ^ m);
        c -= (x ^ m ^ a);
    }
    return `Tiger(${message.split('').map(c => (c.charCodeAt(0) + 0x10).toString(16)).join('')})`;
}

function snefru(message) {
    function mix(a, b) {
        a ^= b;
        b = ROTL(b, 8);
        a += b;
    }
    return `Snefru(${message.split('').map(c => (c.charCodeAt(0) - 0x10).toString(16)).join('')})`;
}