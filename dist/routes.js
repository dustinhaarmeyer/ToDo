"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const settings = JSON.parse(fs.readFileSync("./settings.json", "utf8"));
const todos = JSON.parse(fs.readFileSync("./todos.json", "utf8"));
const routes = express_1.Router();
routes.get('/', (req, res) => {
    switch (req.query.sortieren) {
        case "prio":
            {
                const todoPrio = todos;
                let n = todoPrio.length;
                while (n > 1) {
                    for (let i = 0; i <= n - 2; i++) {
                        if (todoPrio[i].prio < todoPrio[i + 1].prio && todoPrio[i].fertig == 0) {
                            let hilf = todoPrio[i];
                            todoPrio[i] = todoPrio[i + 1];
                            todoPrio[i + 1] = hilf;
                        }
                    }
                    n--;
                }
                return res.send(todoPrio);
                break;
            }
        case "name":
            {
                const todoName = todos;
                let n = todoName.length;
                while (n > 1) {
                    for (let i = 0; i <= n - 2; i++) {
                        if (todoName[i].name > todoName[i + 1].name && todoName[i].fertig == 0) {
                            let hilf = todoName[i];
                            todoName[i] = todoName[i + 1];
                            todoName[i + 1] = hilf;
                        }
                    }
                    n--;
                }
                return res.send(todoName);
                break;
            }
        case "gruppe":
            {
                const todoGruppe = todos;
                let n = todoGruppe.length;
                while (n > 1) {
                    for (let i = 0; i <= n - 2; i++) {
                        if (todoGruppe[i].gruppe > todoGruppe[i + 1].gruppe && todoGruppe[i].fertig == 0) {
                            let hilf = todoGruppe[i];
                            todoGruppe[i] = todoGruppe[i + 1];
                            todoGruppe[i + 1] = hilf;
                        }
                    }
                    n--;
                }
                return res.send(todoGruppe);
                break;
            }
        case "id":
            {
                const todoID = todos;
                let n = todoID.length;
                while (n > 1) {
                    for (let i = 0; i <= n - 2; i++) {
                        if (todoID[i].id > todoID[i + 1].id && todoID[i].fertig == 0) {
                            let hilf = todoID[i];
                            todoID[i] = todoID[i + 1];
                            todoID[i + 1] = hilf;
                        }
                    }
                    n--;
                }
                return res.send(todoID);
                break;
            }
        case "ende":
            {
                const todoEnde = todos;
                let n = todoEnde.length;
                while (n > 1) {
                    for (let i = 0; i <= n - 2; i++) {
                        if (todoEnde[i].ende > todoEnde[i + 1].ende && todoEnde[i].fertig == 0) {
                            let hilf = todoEnde[i];
                            todoEnde[i] = todoEnde[i + 1];
                            todoEnde[i + 1] = hilf;
                        }
                    }
                    n--;
                }
                return res.send(todoEnde);
                break;
            }
        case "erstellt":
            {
                const todoErstellt = todos;
                let n = todoErstellt.length;
                while (n > 1) {
                    for (let i = 0; i <= n - 2; i++) {
                        if (todoErstellt[i].erstellt > todoErstellt[i + 1].erstellt && todoErstellt[i].fertig == 0) {
                            let hilf = todoErstellt[i];
                            todoErstellt[i] = todoErstellt[i + 1];
                            todoErstellt[i + 1] = hilf;
                        }
                    }
                    n--;
                }
                return res.send(todoErstellt);
                break;
            }
        default: {
            return res.send(todos);
            break;
        }
    }
});
routes.get('/fertig', (req, res) => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id.toString() == req.query.id) {
            todos[i].fertig = settings[1];
            settings[1] = settings[1] + 1;
            let n = todos.length;
            while (n > 1) {
                for (let i = 0; i <= n - 2; i++) {
                    if (todos[i].fertig > todos[i + 1].fertig) {
                        let hilf = todos[i];
                        todos[i] = todos[i + 1];
                        todos[i + 1] = hilf;
                    }
                }
                n--;
            }
        }
        return res.send("Als fertig markiert");
    }
    fs.writeFileSync("./todos.json", JSON.stringify(todos, null, 4));
    fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 4));
});
routes.post('/new', (req, res) => {
    let GruppeX;
    let ende;
    if (req.query.ende == undefined) {
        ende = 0;
    }
    else {
        ende = req.query.ende;
    }
    if (req.query.gruppe == undefined) {
        GruppeX = "Standard";
    }
    else {
        GruppeX = req.query.gruppe;
    }
    let zeit = Date();
    todos.push({ id: settings[0], name: req.query.name, erstellt: zeit, ende: ende, gruppe: GruppeX, prio: req.query.prio, fertig: 0 });
    res.send("Erstellt");
    settings[0] = settings[0] + 1;
    fs.writeFileSync("./settings.json", JSON.stringify(settings, null, 4));
    fs.writeFileSync("./todos.json", JSON.stringify(todos, null, 4));
});
exports.default = routes;
//# sourceMappingURL=routes.js.map