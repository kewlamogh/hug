#! /usr/bin/env node
const { program } = require('commander');
const list = require('./core/list');
const add = require('./core/add');
const view = require('./core/view');
const complete = require('./core/complete');
const task = require('./core/task');
const move = require('./core/move');
const fsinit = require('./core/fsinit');
const search = require('./core/search');
const install = require('./core/install');
const repo = require('./core/repo');
const godoc = require('./core/godoc');
const game = require('./core/game');

program.command('listAll').description('List all the TODO tasks and projects').action(list);
program.command('create <project-name>').description('Create a new hug project manager.').action(add);
program.command('view').description("View the open project.").action(view);
program.command('complete <board> <task>').description("Complete a task. First parameter is the singular board name and the second parameter is the zero index.").action(complete);
program.command('task <task> <board>').description("New task.").action(task);
program.command('move <project>').description("Opens a project.").action(move);
program.command('newProject <projectName> <lang>').description("Creates a project with that name and lang specific boilerplate and opens a project.").action(fsinit);
program.command('bing <q>').description("Searchs q on bing.").action(search);
program.command('installPkg <lang> <q>').description("Installs the package q with CLI for lang.").action(install);
program.command('repo <repo>').description("Opens repo on GitHub.").action(repo);
program.command('godoc <pkg> <host>').description("Opens pkg documentation.").action(godoc);
program.command('arenaBattle').description("...").action(game);

program.parse();