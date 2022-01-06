#! /usr/bin/env node
const { program } = require('commander');
const list = require('./core/list');
const add = require('./core/add');
const view = require('./core/view');
const complete = require('./core/complete');
const task = require('./core/task');
const move = require('./core/move');

program.command('listAll').description('List all the TODO tasks and projects').action(list);

program.command('add <project-name>').description('Add a new hug project').action(add);

program.command('view').description("View the open project.").action(view);

program.command('complete <board> <task>').description("Complete a task. First parameter is the singular board name and the second parameter is the zero index.").action(complete);

program.command('task <task> <board>').description("New task.").action(task);

program.command('move <project>').description("Opens a project.").action(move);

program.parse();
