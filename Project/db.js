/**
 * Created by Shivam on 20-07-2017.
 */
var mysql = require('mysql');

var dbconfig = {
    host: 'localhost',
    user: 'shivamgandhi',
    password: 'milkproduct',
    database: 'webd'
}

function ShoppingCart(query,cb) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(query,function (err,data) {
        if(err) throw err;
        cb(data);
        connection.end();
    })
};

module.exports = {
    ShoppingCart:ShoppingCart
}