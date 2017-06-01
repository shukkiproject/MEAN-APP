const express = require('express');
const router = express.Router();
import MongoDB from '../mongoDB';

let mongodb = new MongoDB();


// Get all
router.get('/pizzas', (req, res) => {
    mongodb.findAll(res);
});

router.get('/pizzas/:id', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    let id = req.params.id;

    if (id === undefined || id === "") {
        res.status(400).send({status: "error", value: "id undefined"});
        return
    }
    mongodb.findOne(id,res);
});

router.post('/pizzas', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    console.log("ok");
    let val = req.body;

    if (val === undefined || val === "") {
        res.status(400).send({status: "error", value: "Value undefined"});
        return
    }
    mongodb.save(val, res);
});

router.put('/pizzas/:id', (req, res) => {
    let id = req.body._id;
    // res.setHeader('Content-Type', 'application/json');

    if (id === undefined || id === "") {
        res.status(400).send({status: "error", value: "id undefined"});
        return
    }
    mongodb.update(req.body,res);
});

router.delete('/pizzas/:id', (req, res) => {

    // res.setHeader('Content-Type', 'application/json');

    let id = req.params.id;

    if (id === undefined || id === "") {
        res.status(400).send({status: "error", value: "id undefined"});
        return
    }

    mongodb.deleteP(id, res);
});

module.exports = router;
