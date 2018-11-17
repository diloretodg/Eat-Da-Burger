
var mysql = require("mysql");

var connection 

//calling heroku enviromental var 
if(process.env.JAWSDB_URL){
connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
  connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Admin!",
  database: "EDB_db"

});
}

//connect EDB_DB
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//export for ORM 
module.exports = connection;