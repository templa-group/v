// noinspection JSUnusedGlobalSymbols, JSCheckFunctionSignatures

export function toBase64(id, width, height) {
    let canvas = document.querySelectorAll("[".concat("_bl_").concat(id).concat('=""]'))[0];
    
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = width;
    resizedCanvas.height = height;
    
    const resizedCtx = resizedCanvas.getContext('2d');
    resizedCtx.drawImage(canvas, 0, 0, width, height);
    
    const imageData = resizedCtx.getImageData(0, 0, width, height);    
    resizedCtx.putImageData(imageData, 0, 0);
    
    return resizedCanvas.toDataURL('image/png').split(';base64,')[1];
}