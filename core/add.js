const conf = new (require('conf'))()
const chalk = require('chalk')

function add(project) {
    let projects = conf.get('projects');
    let proj = {
        title: project,
        bugs: [],
        completed: [],
        enhancements: []
    };
    if (!projects) { projects = [proj]; } else { projects.push(proj); }
    conf.set('projects', projects);
    console.log(chalk.green.bold('Project has been added successfully!'));
}

module.exports = add