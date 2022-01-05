const express = require("express");
const Database = require("better-sqlite3");
const config = require("../config.json");

const app = express.Router();
app.use(express.urlencoded({ extended: true }));
const db = new Database(config["databaseName"]);

const tableName = config["tableName"];

app.post("/signin", (req, res) => {
    try {
        const data = req.body;

        const email = data.email;
        const password = data.password;

        const emailSelectStatement = db.prepare(
            `SELECT * FROM ${tableName} WHERE email = ?`
        );
        const emailData = emailSelectStatement.get(email);

        const dbPassword = emailData["password"]
        const username = emailData["username"]

        if (dbPassword === password) {
            res.send({
                success: true,
                username: username
            })
        } else {
            res.send({
                success: false,
                cause: "Incorrect password entered!"
            })
        }
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            cause: "No account found with the provided email!"
        });
    }
});

module.exports = app;