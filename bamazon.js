var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "20arya16",
    database: "bamazon_db"
});

connection.connect(function(err, res) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});



function displayProductTable(res) {

    var table = new Table({
        head: ['Item_Id', 'Product', "Price"],
        colWidths: [10, 30, 10]
    });

    for (var i = 0; i < res.length; i++) {
        var row = res[i];
        var rowData = [row.item_id, row.product_name, row.price];
        table.push(rowData);
    };
    console.log(table.toString());
};


function start() {
    var forSale = process.argv[1];
    if (forSale) {
        var query = "SELECT item_id, product_name, price FROM products";
        connection.query(query, function(err, res) {
            if (err) throw err;
            displayProductTable(res);
        });
    };
    buyProduct();
};

function buyProduct() {
    inquirer.prompt({
        type: "input",
        name: "buy",
        message: "What is the id of the product you would like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }).then(function(answer) {
            console.log(answer.buy);
            console.log(answer.quantity);




            // {
            //     type: "input",
            //     name: "quantity",
            //     message: "Please enter the quantity",
            //     validate: function(value) {
            //         if (isNaN(value) === false) {
            //             return true;
            //         }
            //         return false;
            //     }

        });

    }
}
