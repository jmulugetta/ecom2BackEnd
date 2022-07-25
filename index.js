//accessing installed packages, then assigning variables to use them

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();

app.use(cors());
app.use(express.json());

//creating server below
//8080 means available port
app.listen(8080, () => {
    console.log("This port is ready.")
})

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database,
    port: process.env.db_port
})

db.connect((err) => {
    if(err){
        console.log(err.message)
    }
    console.log("AWS connected.")
})

app.get("/jewelry", (req, res) => {
    db.query("SELECT * from products", (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
    
})

app.get("/HighToLow", (req, res) => {
    db.query("SELECT * from products ORDER BY price desc", (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
    
})
app.get("/lowToHigh", (req, res) => {
    db.query("SELECT * from products ORDER BY price asc", (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
    
})