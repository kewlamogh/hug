const conf = new (require('conf'))()
const chalk = require('chalk')

function list () {
    const todoList = conf.get('projects');
    if (!todoList) {
        conf.set('projects', []);
        console.log(chalk.yellow("No projects."))
    } else {
        todoList.forEach((proj) => {
            console.log(proj);
        });
    }
}

module.exports = list