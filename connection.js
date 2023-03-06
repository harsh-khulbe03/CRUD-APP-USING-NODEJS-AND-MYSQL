const mysql = require("mysql");

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mysqlnode",
    port:3307
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connection created...");
})

module.exports.con = con;