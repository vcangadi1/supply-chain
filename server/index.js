const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid').v4;
console.log(uuidv4());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test1234',
    database: 'processmapdatabase'
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


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

    const { inMaterial, inForm, inDescription, ProcessName, pDescription, pNotes } = req.body;
    console.log(inMaterial);
    const sqlInsert = `INSERT INTO input_process (inMaterial, inForm, inDescription, ProcessName, pDescription, pNotes) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sqlInsert, [inMaterial, inForm, inDescription, ProcessName, pDescription, pNotes], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/api/insert/process', (req, res) => {

    const { ProcessName, pDescription, pNotes } = req.body;
    console.log(inMaterial);
    const sqlInsert = `INSERT INTO input_process (inMaterial, inForm, inDescription, ProcessName, pDescription, pNotes) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sqlInsert, [inMaterial, inForm, inDescription, ProcessName, pDescription, pNotes], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.post('/api/insert/output', (req, res) => {

    const { outMaterial, outForm, outDescription, ProcessName, pDescription, pNotes } = req.body;
    const sqlInsert = `INSERT INTO output_process (outMaterial, outForm, outDescription, ProcessName, pDescription, pNotes) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sqlInsert, [outMaterial, outForm, outDescription, ProcessName, pDescription, pNotes], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });
});

app.listen(3001, () => {
    console.log("run on port 3001");
});