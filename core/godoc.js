module.exports = function (pkg, host) {
    require('openurl2').open("https://pkg.go.dev/"+host+"/"+pkg)
}