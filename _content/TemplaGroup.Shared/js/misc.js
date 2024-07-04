// noinspection JSUnusedGlobalSymbols

export function getBrowserInfo() {
    return navigator.userAgent;
}

export function openExternalLink(url) {
    window.open(url, '_blank');
}