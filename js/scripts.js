// noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable

/* DotNet Helpers */
class Helpers {
    static dotNetHelper;

    static setDotNetHelper(value) {
        Helpers.dotNetHelper = value;
    }
}

window.Helpers = Helpers;

// Culture
window.cultureInfo = {
    get: () => window.localStorage['AppCulture'],
    set: (value) => window.localStorage['AppCulture'] = value
};

// Barcode
const barcodeHidReader = (function () {
    const IDLE = 'idle'
    const CAPTURING = 'capturing'
    let timeoutID

    let state = IDLE

    let timeout
    let prefix
    let suffix
    let callback

    let barcode
    let events
    let shortState
    let node
    let log

    function reset() {
        timeoutID = undefined
        barcode = ''
        events = []
        shortState = IDLE
    }

    function dispatchEvent(barcode) {
        const event = new Event('barcode', {
            cancelable: true,
            bubbles: true
        })
        
        event.data = barcode
        node.dispatchEvent(event)
    }

    function handleTimeout() {
        events.forEach(el => {
            el.explicitOriginalTarget.dispatchEvent(el)
        })
        reset()
    }

    function logger() {
        if (log) {
            if (typeof log === 'function') {
                log(...arguments)
            } else {
                console.log('barcode hid reader', performance.now(), ...arguments)
            }
        }
    }

    function dispatchKeyUp(e) {
        logger(shortState, e, e.custom)

        if (e.altKey || e.ctrlKey) {
            return
        }

        if (shortState === CAPTURING && e.key.length === 1) {
            e.preventDefault()
            e.stopPropagation()
            events.push(
                Object.assign(new KeyboardEvent('keyup', e), {custom: true})
            )
        }
        if (shortState === CAPTURING && e.key.toLowerCase() === suffix) {
            timeoutID && clearTimeout(timeoutID)

            e.preventDefault()
            e.stopPropagation()

            logger('barcode', barcode)
            callback(barcode)

            reset()
        }
    }

    function dispatchKeyDown(e) {
        logger(shortState, e, e.custom)
        //console.log("Dispatch key down: " + shortState + ', ' + e + ', ' + e.custom + ', ' + e.key)
        //console.log("Data: " + barcode)

        if (e.custom) {
            return
        }

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return
        }

        if (shortState !== CAPTURING && e.key.length !== 1) {
            return
        }

        if (e.altKey || e.ctrlKey) {
            return
        }

        if (shortState === CAPTURING && e.key.toLowerCase() === suffix) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        if (prefix !== '' && e.key === prefix) {
            shortState = CAPTURING
        }

        if (prefix === '' && e.key.length === 1) {
            shortState = CAPTURING
        }

        if (shortState === CAPTURING) {
            events.push(
                Object.assign(new KeyboardEvent('keydown', e), {custom: true})
            )
            events.push(
                Object.assign(new KeyboardEvent('keypress', e), {custom: true})
            )

            if (e.key !== prefix) {
                barcode += e.key
            }

            e.preventDefault()
            e.stopPropagation()

            timeoutID && clearTimeout(timeoutID)
            timeoutID = setTimeout(handleTimeout, timeout)
        }
    }

    const defaults = {
        timeout: 30,
        prefix: '',
        suffix: 'Enter',
        callback: dispatchEvent,
        log: false
    }

    return {
        defaults,
        startCapturing(doc, options) {
            logger('start capturing');
            ({timeout, prefix, suffix, callback, log} = Object.assign(
                defaults,
                options
            ))
            suffix = suffix.toLowerCase()
            reset()
            node = doc
            node.addEventListener('keydown', dispatchKeyDown, true)
            node.addEventListener('keyup', dispatchKeyUp, true)
            state = CAPTURING
        },
        stopCapturing() {
            logger('stop capturing')
            node.removeEventListener('keydown', dispatchKeyDown, true)
            node.removeEventListener('keyup', dispatchKeyUp, true)
            state = IDLE
        },
        getState() {
            logger('state', state)
            return state
        },
        CAPTURING: CAPTURING,
        IDLE: IDLE
    }
})()

function processBarcode(barcode) {
    let element = document.activeElement;
    if (element.getAttribute('role') === 'dialog' && element.classList.contains('barcode')) {
        // noinspection JSUnresolvedFunction
        Helpers.dotNetHelper.invokeMethodAsync("BarcodeScanned", barcode);
    }
}

function log(arguments) {
    //console.log(arguments);
}

barcodeHidReader.defaults.callback = processBarcode;
barcodeHidReader.defaults.log = log;

window.startCapturing = () => {
    barcodeHidReader.startCapturing(document);
}

window.stopCapturing = () => {
    barcodeHidReader.stopCapturing();
}