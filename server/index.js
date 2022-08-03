const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid').v4;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'processmapdatabase'
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: true, credentials: true}));


// Get data from database
app.get('/api/get/:uid', (req, res) => {
    const sqlSelect = `SELECT * FROM ${req.params.uid}`;
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });
});


app.post('/api/insert/input', (req, res) => {

    const { id, inMaterial, inForm, inDescription } = req.body;
    const sqlInsert = `INSERT INTO input (id, inMaterial, inForm, inDescription) VALUES (?, ?, ?, ?)`;
    db.query(sqlInsert, [id, inMaterial, inForm, inDescription], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/api/insert/process', (req, res) => {

    const { id, ProcessName, pDescription, pNotes } = req.body;
    const sqlInsert = `INSERT INTO process (id, ProcessName, pDescription, pNotes) VALUES (?, ?, ?, ?)`;
    db.query(sqlInsert, [id, ProcessName, pDescription, pNotes], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/api/insert/output', (req, res) => {

    const { id, outMaterial, outForm, outDescription } = req.body;
    const sqlInsert = `INSERT INTO output (id, outMaterial, outForm, outDescription) VALUES (?, ?, ?, ?)`;
    db.query(sqlInsert, [id, outMaterial, outForm, outDescription], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.listen(3001, () => {
    console.log("run on port 3001");
});