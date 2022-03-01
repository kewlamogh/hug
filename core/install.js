const { exec } = require('child_process')

module.exports = function (lang, q) {
    switch (lang) {
        case 'go':
            exec('go get "'+q+'"')
            break
        case 'node':
        case 'ts':
            exec("npm i "+q)
            break
    }
}