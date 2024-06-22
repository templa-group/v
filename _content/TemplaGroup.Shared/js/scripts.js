// noinspection JSUnresolvedReference,JSCheckFunctionSignatures

window.removeQueryParam = function (param) {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url);
};