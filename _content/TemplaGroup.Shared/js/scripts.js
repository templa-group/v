// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

window.cryptoFunctions = {
    encrypt: function (text, key) {
        return CryptoJS.AES.encrypt(text, key).toString();
    },
    decrypt: function (encryptedText, key) {
        return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    }
};