// noinspection JSUnusedGlobalSymbols
function toBase64(id) {
    let canvas = document.querySelectorAll("[".concat("_bl_").concat(id).concat('=""]'));
    return canvas[0].toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
}

// Culture
window.cultureInfo = {
    get: () => window.localStorage['AppCulture'],
    set: (value) => window.localStorage['AppCulture'] = value
};

async function ChangeProcess(proc){
    console.log("si entramos a chengeproces")
    proc = document.getElementById(proc).autofocus;
    input.addEventListener('change', updateValue);
}