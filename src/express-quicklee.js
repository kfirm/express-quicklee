var Cachelee = require('cachelee');

var cacheMachine = new Cachelee.Cache({limit: 1000, strategy: Cachelee.Strategy.LeastFrequentlyUsed});

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


    if (cachedResponse){
        res.send(cachedResponse);
    } else {

        var originalResponseFunc = res.send;

        res.send = function (data) {
            cacheMachine.cache(requestCacheKey,data);
            originalResponseFunc.apply(res,arguments);
        };

        next();
    }
};