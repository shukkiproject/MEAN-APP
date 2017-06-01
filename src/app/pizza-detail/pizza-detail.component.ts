import { Component, OnInit } from '@angular/core';
import {Pizza} from "../pizza";
import {PizzaService} from "../pizza.service";
import {ActivatedRoute, Params} from "@angular/router";
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.css']
})
export class PizzaDetailComponent implements OnInit {

  pizza: Pizza;
  constructor(
      private pizzaService: PizzaService,
      private route: ActivatedRoute,
      private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) =>  this.pizzaService.getPizza(params['id'])
    ).subscribe(pizza => this.pizza = pizza);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.pizzaService.updatePizza(this.pizza)
        .then(() => this.goBack());
  }

}
