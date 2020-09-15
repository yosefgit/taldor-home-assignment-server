const url = require('url');

function isUrlUnderRequestedHost(host, urlToCheck){
    return url.parse(urlToCheck).host = host;
}

function isUrlLinkToImage(urlToCheck){
    return /\.(jpg|jpeg|tiff|gif|png|bmp)$/.test(urlToCheck)
}

function asyncHandler(asyncFunction){
    return function(req, res, next){
        return Promise.resolve(asyncFunction(req, res, next)).catch(next())
    }
}

module.exports = {
    isUrlLinkToImage,
    isUrlUnderRequestedHost,
    asyncHandler
}