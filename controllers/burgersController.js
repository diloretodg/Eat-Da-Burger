let express = require("express");
let router= express.Router();

//Imports the model (burger.js) to use its database functionality
let burgers = require("../models/burgers.js");

//handles Get method and runs the selectAll function 
router.get('/api/burgers',(req, res)=>{
    burgers.all((data)=>{
        res.json(data);
    });
});

//handles POST method and runs insertOne function
router.post('/api/burgers',(req,res)=>{
    let burger = req.body.burger;
    let eaten = req.body.eaten;

    burgers.create(burger, (result)=>{
        res.json({id:result.insertId});
    });
});

//handles PUT method and runs updateOne function
router.put('/api/burgers/:id',(req,res)=>{
    let burgerId = req.params.id;
    let eaten = req.body.eaten;

    burgers.updateOne(burgerId, eaten, (result)=>{
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});
module.exports = router;
