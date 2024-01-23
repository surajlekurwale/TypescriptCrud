var express = require('express');
// const { Request, Response } = require('express');
var mysql = require('mysql');
var app = express();
app.use(express.json());
var db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: "3306",
    database: "whatsapp"
});
db.connect(function (error) {
    if (error) {
        console.log("Error found....");
    }
    else {
        console.log("Connection SuccessFully..");
    }
});
app.post('/postdata', function (req, res) {
    var data = req.body;
    var sql = "INSERT INTO customer SET ?";
    db.query(sql, data, function (err, result) {
        if (err) {
            console.log({ err: "Data Not Post..." });
            // res.json(err)
        }
        else {
            console.log({ result: "Data Post SuccessFullly...." });
        }
    });
});
app.get('/getdata', function (req, res) {
    var sql = " SELECT * FROM customer";
    db.query(sql, function (err, result) {
        if (err) {
            console.log({ err: "data Not Get..." });
        }
        else {
            console.log({ result: "data get SuccessFully..." });
        }
    });
});
app.put('/dataupdate/:id', function (req, res) {
    // const id = req.params.id;
    var data = req.body;
    var sql = "UPDATE customer SET ? WHERE id=?";
    db.query(sql, [data], function (err, result) {
        if (err) {
            console.log({ err: "Data Not Update" });
        }
        else {
            console.log({ result: "Data Update SuccessFully..." });
        }
    });
});
var PORT = 5500;
app.listen(PORT, function () {
    console.log("Server Started On ".concat(PORT));
});
