var Cachelee = require('cachelee');

var cacheMachine = new Cachelee.Cache({limit: 1000, strategy: Cachelee.Strategy.LeastFrequentlyUsed});


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

module.exports = function (req, res, next) {

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
};