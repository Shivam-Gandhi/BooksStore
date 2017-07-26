/**
 * Created by Shivam on 20-07-2017.
 */
var express = require('express');
var app = express();
var sql = require('./db.js');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 4000;

app.use('/',express.static('public_static'));

app.post('/cart/all',function (req,res) {
    var query = 'SELECT * FROM cart';
    sql.ShoppingCart(query,function (data) {
        res.send(data);
    })
    // res.send('I am shivam gandhi');
});

app.post('/cart/insert',function (req,res) {
    var query = 'INSERT into cart VALUES ("' + req.body.name + '",' + req.body.price + ',' + req.body.quantity + ')';
    sql.ShoppingCart(query,function (data) {
        res.send(data);
    })
});

app.post('/cart/del',function (req,res) {
    console.log(req.body.name);
    var query = 'DELETE from cart WHERE name="' + req.body.name + '"';
    sql.ShoppingCart(query,function (data) {
        res.send(data);
    })
});

app.post('/cart/email',function (req,res) {
    console.log(req.body.data);
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shivamgandhi48@gmail.com',
            pass: 'milkproduct'
        }
    });

    var mailOptions = {
        from: 'shivamgandhi48@gmail.com',
        to: 'shivamgandhi48@gmail.com',
        subject: 'Your Order',
        text: req.body.data
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send('yaoo order placed');
});


app.listen(port,function () {
    console.log("Server is running on port :- 4000");
});


