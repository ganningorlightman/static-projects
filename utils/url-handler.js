function getParams() {
    var hash = window.location.search.slice(1);
    var array = hash.split("&");
    var values, params = {};

    for (var i = 0; i < array.length; i += 1) {
        values = array[i].split("=");
        params[values[0]] = values[1];
    }
    return params;
}

function updateUrlParameter(param, value) {
    var paramVal = getParams()[param];
    var separator = (window.location.href.indexOf('?') === -1 ) ? '?' : '&';
    var newLocation = (paramVal) ? window.location.href.replace(paramVal, value) : window.location.href + separator + param + '=' + value;
    window.history.pushState(paramVal, window.location.href);
    window.history.replaceState(paramVal, window.location.href, newLocation);
}

function removeUrlParameter(param) {
    var url = window.location.href;
    var urlparts= url.split('?');
    if (urlparts.length>=2) {
        var prefix= encodeURIComponent(param)+'=';
        var pars= urlparts[1].split(/[&;]/g);
        for (var i= pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        var newLocation = window.location.href.replace(window.location.href, url);
        window.history.replaceState(param, window.location.href, newLocation);
        window.history.pushState(param, window.location.href, newLocation);
    }
}

function updateUrl(newUrl) {
    window.history.replaceState('', window.location.href, newUrl);
}

module.exports = {
    getParams: getParams,
    updateUrlParameter: updateUrlParameter,
    removeUrlParameter: removeUrlParameter,
    updateUrl: updateUrl
};