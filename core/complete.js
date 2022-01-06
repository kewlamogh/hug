const conf = new (require('conf'))()
const chalk = require('chalk')

function list (t, j) {
    const o = conf.get("curr");
    const todoList = conf.get('projects');
    for (let i of todoList.filter(e => e.title == o)) {
        i["completed"].push(i[t+"s"][parseInt(j)]);

        delete i[t+"s"][parseInt(j)];
        i[t+"s"] = i[t+"s"].filter(e => e != null)
    }
    conf.set('projects', todoList);
}

module.exports = list