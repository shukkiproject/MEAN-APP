import mongoose from 'mongoose';

let pizzaSchema = mongoose.Schema({
    name: String,
    type: String,
    recipe: Array,
    price: Number,
});

let PizzaModal =  mongoose.model('Pizza', pizzaSchema);

export default class MongoDB {

    constructor(){
        mongoose.connect('mongodb://localhost:27017/pizza');
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', () => {
            console.log('mongo up ');
        });
        // pizzaTab.forEach(pizza => this.save(pizza));
    }

    findAll(res) {
        PizzaModal.find((err, pizzas) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return
            }
            res.status(200).send(pizzas);
        });
    }


    findOne(id, res) {
        PizzaModal.findById(id , (err, pizza) => {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(pizza);
            }
        });
    }



    save(val, res) {
        let pizza = new PizzaModal({ name: val.name, type: val.type, recipe: val.recipe, price: val.price});

        pizza.save((err, pizza) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(201).send(pizza);
            }
        });
    }

    update(val, res) {

        PizzaModal.findOneAndUpdate(
            { "_id": val._id },
            { "$set": { name: val.name, type: val.type, recipe: val.recipe, price: val.price}}
            ).exec(function(err, pizza){
            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(pizza);
            }
        });
    }

    deleteP(id, res) {
        PizzaModal.remove({_id: id}, err => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send({_id: id});
            }
        });

    }



}