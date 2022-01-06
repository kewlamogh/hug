const conf = new (require('conf'))()
const chalk = require('chalk')

function list(project) {
    conf.set('curr', project);
    console.log(chalk.green("Moved to project "+project))
}

module.exports = list