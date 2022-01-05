const express = require("express");
const Database = require("better-sqlite3");
const config = require("../config.json");
const bodyParser = require("body-parser");

const app = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = new Database(config["databaseName"]);

const tableName = config["tableName"];

app.post("/createaccount", (req, res) => {
    try {
        const data = JSON.parse(JSON.stringify(req.body));

        const email = data.email;
        const password = data.password;
        const username = data.username;

        const emailSelectStatement = db.prepare(`SELECT * FROM ${tableName} WHERE email = ?`);
        const emailData = emailSelectStatement.get(email);

        if (emailData) {
            res.send({
                success: false,
                cause: "User with the same email already exists!",
            });
            return
        }

        const usernameSelectStatement = db.prepare(`SELECT * FROM ${tableName} WHERE username = ?`);
        const usernameData = usernameSelectStatement.get(username);

        if (usernameData) {
            res.send({
                success: false,
                cause: "User with the same username already exists!",
            });
            return
        }

        const insertStatement = db.prepare(`INSERT INTO ${tableName} VALUES (?, ?, ?)`);
        insertStatement.run(email, password, username);

        res.send({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            cause: JSON.stringify(err),
        });
    }
});

module.exports = app;