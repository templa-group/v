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

// Theme
window.setColorMode = (colorMode) => {
    if (colorMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-bs-theme', colorMode)
    }
}

async function ChangeProcess(proc){
    console.log("si entramos a chengeproces")
    proc = document.getElementById(proc).autofocus;
    input.addEventListener('change', updateValue);
}

window.saveAsFile = (fileName, content) => {
    const blob = new Blob([content], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
};