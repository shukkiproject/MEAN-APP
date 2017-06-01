import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import {Pizza} from "../pizza";

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {
  // instantiate pizza to an empty array
  pizzas: Pizza[];
  pizza: Pizza = {
      _id: '',
    name: '',
    type: '',
    recipe : [],
    price: null
  };
  constructor(private pizzaService: PizzaService) { }

  ngOnInit():void {
    // Retrieve pizza from the API
      this.getPizzas();
  }

    private getPizzas():void {
        // this.pizzaService.getAllPizzas().subscribe(posts => {
        //     this.pizzas = posts;
        // });
        this.pizzaService.getAllPizzas().then(pizzas => {
            this.pizzas = pizzas.sort((a: Pizza, b: Pizza) =>
                   a.name > b.name ? 1 : -1
            );
        });
    }

    add(): void {
      // to string because the type is array

        this.pizza.recipe = this.pizza.recipe.toString().split(",");

        if (!this.pizza) { return; }

        this.pizzaService.create(this.pizza)
            .then(pizza => {
                this.pizzas.push(pizza);
            });
    }

    deleteP(pizza: Pizza): void {

        this.pizzaService
            .deleteP(pizza._id)
            .then(() => {
                this.pizzas = this.pizzas.filter(p => p !== pizza);
            });
    }


}
