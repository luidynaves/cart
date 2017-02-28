'use strict';
var basic;
var env;

class Util {
    constructor(that) {
        this.that = that
    }


    getEnv() {
        return env;
    }

    getHeaderFormUrlEncoded(token) {
        var header = this.getDefaultHeader(token);

        header[config.util.CONTENT_TYPE] = config.util.ContentType.FORM_URL_ENCODED;

        return header;
    }

    getUrls() {
        return config.urls.environment;
    }

    getHeaderJson(token) {
        var header = this.getDefaultHeader(token);
        
        header[config.util.CONTENT_TYPE] = config.util.ContentType.JSON;

        return header;
    }

    getOAuthHeader = function() {
        var header = config.util.DEFAULT_HEADER;
        header.Authorization = config.util.BASIC + basic;
        header[config.util.CONTENT_TYPE] = config.util.ContentType.FORM_URL_ENCODED;

        return header;
    }

    getDefaultHeader(token) {
        var header = config.util.DEFAULT_HEADER;
        header.Authorization = config.util.BEARER + token;
        
        return header;
    }

    getUrl(baseUrl, header, url) {
        return chai.request(baseUrl)
            .get(url)
            .set(header);
    }

    postUrl(baseUrl, body, header, url) {
        return chai.request(baseUrl).post(url)
            .set(header)        
            .send(body);
    }

    deleteUrl(baseUrl, body, header, url) {
        return chai.request(baseUrl)
            .del(url)
            .set(header)
            .send(body);
    }

    putUrl(baseUrl, body, header, url) {
        return chai.request(baseUrl)
            .put(url)
            .set(header)
            .send(body);
    }

    timeout(miliseconds) {
        this.that.timeout(miliseconds);
    }

    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

};