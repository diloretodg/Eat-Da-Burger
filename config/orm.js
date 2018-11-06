var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}
var orm = {

  selectAll:(callback)=>{
      connection.query('SELECT * FROM burgers;', (err, res)=> {
        if (err) {
          console.log(err);
          return;
        } 
        else {
          callback(res);
        }
      });
    },
    
    insertOne:(burger, eaten, callback)=>{
      connection.query('INSERT INTO burgers (burger, eaten) VALUES (?,?)', [burger, eaten], function(err, res) {
        if (err) {
          console.log(err);
          return
        } 
        else {
          // orm.transferFunc();
          callback(res);
        }
      });
    },

    updateOne:(id, set, callback)=>{
      connection.query('UPDATE burgers SET ? WHERE ?', [{eaten:set}, {id:id}], function(err, res){
        if (err) {
          console.log(err);
          return;
        } 
        else {
          // orm.transferFunc();
          callback(res);
        }
      });
    },

    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // vals is an array of values that we want to save to cols
    // cols are the columns we want to insert the values into
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // objColVals would be the columns and values that you want to update
    // an example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
  }
  

  module.exports = orm;