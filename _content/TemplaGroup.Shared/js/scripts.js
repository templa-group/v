// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

window.removeQueryParam = function (param) {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url);
};

window.generateKeyPair = async function () {
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: { name: "SHA-256" },
        },
        true,
        ["sign", "verify"]
    );
    let publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    let privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
    
    return JSON.stringify({
        publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))),
        privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey)))
    });
}