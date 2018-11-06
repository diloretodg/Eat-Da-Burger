//Imports the ORM to implement functions to interact with the database
var orm = require("../config/orm.js");

var burgers = {
    
    all: function(cb) {
        orm.all("burgers", function(res) {
          cb(res);
        });
      },
      create: function(name, cb) {
        orm.create("burgers", [
          "burger", "eaten"
        ], [
          name, false
        ], cb);
      },
      update: function(id, cb) {
        var condition = "id=" + id;
        orm.update("burgers", {
          eaten: true
        }, condition, cb);
      },
    //runs SelectAll from orm.js
    selectAll: (callback)=>{
        orm.selectAll(callback, (res)=>{
            callback(res);
        });
    },

    //runs insertOne from orm.js
    insertOne: (burger, eaten, callback)=>{
        if (eaten == false) eaten = false;
        // else eaten = true;

        orm.insertOne(burger, eaten, callback, function(res){
            callback(res);
        });
    },

    //runs updateOne from orm.js
    updateOne: (id, set, callback)=>{
        if (set == "false") set = false;
        else set = true;

        orm.updateOne(id, set, callback, function(res){
            callback(res);
        })
    },

    //runs resetAll from orm.js
    resetAll: (callback)=>{
        orm.resetAll(callback,function(res){
            callback(res);
        });
    }
};

module.exports = burgers;
