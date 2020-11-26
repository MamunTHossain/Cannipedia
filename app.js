// MySQL Connection
const mysql = require("mysql");
const cors = require('cors');

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mamun123",
  database: "mydb",
  port: 3306,
  charset: "utf8mb4"
});
db.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

//  ---------------- routing ----------------
const express = require("express");
app = express();
app.use(cors());
// Get Suppliers
app.get("/suppliers", (req, res) => {
  // Tested
  console.log("GET suppliers");
  let sql = "SELECT SupplierName, Location FROM suppliers;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/strains", (req, res) => {
    // Tested
    console.log("GET strains");
    let sql = "select StrainName, Feelings, GrowthRegion from strains;";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/strains", (req, res) => {
    // Tested
    console.log("GET strains");
    let sql = "SELECT * FROM mydb.strains";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/highselling", (req, res) => {
    // Tested
    console.log("GET highselling");
    let sql = "select ProductName,Price,SupplierName from products,suppliers WHERE Price > (Select AVG(price) from products) AND products.SupplierID = suppliers.SupplierID;";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/products", (req, res) => {
    // Tested
    console.log("GET products");
    let sql = "Select p.ProductName, p.price, s.SupplierName, s.location from products as p, suppliers as s where p.SupplierID = s.SupplierID;";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/usersAge", (req, res) => {
    // Tested
    console.log("GET usersAge");
    let sql = "select * from users WHERE users.Age > 25";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/avgrating", (req, res) => {
    // Tested
    console.log("GET avgrating");
    let sql = "select products.ProductName, AVG(reviews.Rating) from products join orders on products.ProductID = orders.ProductID join reviews on reviews.OrderID = orders.OrderID group by products.ProductName;";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

app.listen("3000", () => {
  console.log("Now listening on port 3000");
});


app.get("/highreview", (req, res) => {
  // Tested
  console.log("GET highreview");
  let sql = "select firstname, lastname, feeling from users, orders, reviews where users.UserID = orders.UserID and orders.orderID = reviews.OrderID and reviews.rating > 4;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/bcproduct", (req, res) => {
  // Tested
  console.log("GET bcproduct");
  let sql = "select firstname, lastname from users where users.userID = any(select userid from orders, products, suppliers where orders.ProductID = products.productID and products.SupplierID = suppliers.SupplierID and suppliers.Location = 'British Columbia')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
