import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Pizza} from "../pizza";
import {PizzaService} from "../pizza.service";

@Component({
  moduleId: module.id,
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input('group')
  public pizzaForm: FormGroup;
  public pizzas: Pizza[];
  constructor( private pizzaService: PizzaService) { }

  ngOnInit() {
    this.getAllPizzas();
  }
  getAllPizzas(){
    this.pizzaService.getAllPizzas().then(pizzas => {
      this.pizzas = pizzas.sort((a: Pizza, b: Pizza) =>
          a.name > b.name ? 1 : -1
      );
    });
  }

}
