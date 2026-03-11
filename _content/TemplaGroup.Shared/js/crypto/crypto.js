// noinspection JSUnresolvedReference,JSCheckFunctionSignatures,JSUnusedGlobalSymbols

export function encrypt(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
}

export function decrypt(encryptedText, key) {
    return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
}

export async function importKey(secret) {
    return await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify'],
    );
}

export async function generateHMACKey() {
    const key = await crypto.subtle.generateKey(
        {
            name: "HMAC",
            hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
    );
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
}

export async function signData(data, secret) {
    const key = await importKey(secret);
    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(data),
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export async function verifySignature(data, signature, secret) {
    const key = await importKey(secret);
    const sigBuf = Uint8Array.from(atob(signature), c => c.charCodeAt(0));

    return await crypto.subtle.verify(
        'HMAC',
        key,
        sigBuf,
        new TextEncoder().encode(data),
    );
}