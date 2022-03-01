module.exports = function (q) {
    require("openurl2").open("https://bing.com/search?q="+encodeURIComponent(q))   
}