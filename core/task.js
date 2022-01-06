const conf = new (require('conf'))()
const chalk = require('chalk')

function list(task, board) {
    const project = conf.get("curr");
    const todoList = conf.get('projects');
    for (let i of todoList.filter(it => it.title == project)) {
        i[board].push(task);
    }
    conf.set("projects", todoList);
    console.log(chalk.green("Added "+task+" to board "+board))
}

module.exports = list