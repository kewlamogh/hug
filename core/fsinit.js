const fs = require('fs');
const add = require("./add")
const move = require("./move")

function fsinit(projectName, lang) {
    fs.mkdirSync(projectName)
    
    add(projectName)
    move(projectName)
    switch (lang) {
        case 'node':
            fs.appendFileSync(projectName+"/index.js", "")
            fs.appendFileSync(projectName+"/package.json", `{
                
                    "name": "${projectName}",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "scripts": {
                        "start": "node index.js"
                    },
                    "keywords": [],
                    "author": "AmoghTheCool",
                    "license": "ISC",
                
            }`)

            break;
        case 'go':
            fs.appendFileSync(projectName+"/go.mod", `module github.com/kewlamogh/goth
go 1.17`)

            break;
        case 'ts':
            fs.appendFileSync(projectName+"/index.ts", "")
            fs.appendFileSync(projectName+"/package.json", `{
                    "name": "${projectName}",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.ts",
                    "scripts": {
                        "start": "ts-node index.ts"
                    },
                    "keywords": [],
                    "author": "AmoghTheCool",
                    "license": "ISC",
            }`)

            fs.appendFileSync(projectName+"/tsconfig.json", fs.readFileSync("tsconfig.json").toString())
            break;
        case 'expressnode':
            fs.appendFileSync(projectName+"/index.js", `
                const express = require('express')
                const app = express()

                app.listen(3000)
            `)
            fs.appendFileSync(projectName+"/package.json", `{
                {
                    "name": "${projectName}",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.js",
                    "scripts": {
                        "start": "node index.js"
                    },
                    "keywords": [],
                    "author": "AmoghTheCool",
                    "license": "ISC"
                }
            }`)
            break;
        case 'expressts':
            fs.appendFileSync(projectName+"/index.ts", `
                import express from 'express'
                const app = express()

                app.listen(3000)
            `)

            fs.appendFileSync(projectName+"/package.json", `{
                
                    "name": "${projectName}",
                    "version": "1.0.0",
                    "description": "",
                    "main": "index.ts",
                    "scripts": {
                        "start": "ts-node index.ts"
                    },
                    "keywords": [],
                    "author": "AmoghTheCool",
                    "license": "ISC"
                
            }`)

            break;
    }
}

module.exports = fsinit