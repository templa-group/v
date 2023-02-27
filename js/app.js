/*function takeScreenshot(id) {
    //var img = "";

    //await html2canvas(document.querySelector("#" + id)).then(canvas => img = canvas.toDataURL("image/png"));

    const d = document.createElement("a");
    d.href = document.getElementById(id).toDataUrl('image/png');
    d.download = "image.png";
    d.click();
}*/
async function takeScreenshot(id){
    var img = "[".concat("_bl_").concat(id).concat('=""]');
    //await html2canvas(document.querySelector("#" + id)).then(canvas => img = canvas.toDataURL("image/png"));
    console.log(img)
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.querySelectorAll(img);
    console.log(canvas)
    let dataURL = canvas[0].toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();

    await DotNet.invokeMethodAsync('WebApp','JStoCSCall', dataURL);

    /*  const d = document.createElement("a");
     d.href = document.getElementById(id).toDataUrl('image/png');
    
    
    d.download = "image.png";
    d.click();*/
}

// noinspection JSUnusedGlobalSymbols
function printSystem(id) {
    let img = "[".concat("_bl_").concat(id).concat('=""]');
    //await html2canvas(document.querySelector("#" + id)).then(canvas => img = canvas.toDataURL("image/png"));
    console.log(img)

    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.querySelectorAll(img);
    console.log(canvas)
    let dataURL = canvas[0].toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();

    /*  const d = document.createElement("a");
      d.href = document.getElementById(id).toDataUrl('image/png');
      d.download = "image.png";
      d.click();*/
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