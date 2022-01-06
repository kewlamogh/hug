const conf = new (require('conf'))();

function view() {
    let tasks = conf.get("curr");
    let proj = conf.get("projects").filter(e => e.title == tasks)[0];
    console.log(proj);
}

module.exports = view