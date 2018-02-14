var Cachelee = require('cachelee');

var cacheMachine = null;

/***
 * This is a generator of a key for caching.
 * It uses common request properties, creates an object from them and  returns that object as a string (the key).
 * Each unique request path should return the same key string
 * @param request
 */
function requestHash(request) {
    var requestHashObject = {
        method: request.method,
        params: request.params,
        query: request.query,
        baseUrl: request.baseUrl,
        originalUrl: request.originalUrl,
        url: request.url
    };

    return JSON.stringify(requestHashObject);
}

function expressQuickleeMiddleware(req, res, next) {

    var requestCacheKey = requestHash(req);
    var cachedResponse = cacheMachine.get(requestCacheKey);


    if (cachedResponse) {

        // send cached
        res.send(cachedResponse);

    } else {

        // intercept send function to catch sent data and cache it
        var originalResponseFunc = res.send;

        res.send = function (data) {
            // cache response data
            cacheMachine.cache(requestCacheKey, data);
            // execute original send function
            originalResponseFunc.apply(res, arguments);
        };

        next();
    }
}

module.exports = function (options) {

    if (options){
        if (options.strategy && options.strategy.toLowerCase() === "lfu"){
            options.strategy = Cachelee.Strategy.LeastFrequentlyUsed
        } else if (options.strategy && options.strategy.toLowerCase() === "lru"){
            options.strategy = Cachelee.Strategy.LeastRecentlyUsed;
        } else if (options.strategy){
            console.warn('Unknown strategy ' + options.strategy + '. Using default (LFU).')
        }
    }

    cacheMachine = new Cachelee.Cache(options);

    return expressQuickleeMiddleware;

};