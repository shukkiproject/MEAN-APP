import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Pizza} from "../pizza";
import {PizzaService} from '../pizza.service';
import {Order} from "../order";

@Component({
  moduleId: module.id,
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit {
  public pizzas: Pizza[];
  public total: number = 0;
  public myForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.getAllPizzas();
    this.myForm = this._fb.group({
      client: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      pizzaQuantity: this._fb.array([
        this.initOrder(),
      ])
    });
  }

  initOrder() {
    return this._fb.group({
      pizzaId: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }


  addOrder() {

    const control = <FormArray>this.myForm.controls['pizzaQuantity'];
    control.push(this.initOrder());
  }

  removeOrder(i: number) {

    const control = <FormArray>this.myForm.controls['pizzaQuantity'];
    control.removeAt(i);
    this.calculate();
  }

  save(order: Order) {

    console.log(order);

    // todo : create API and service to save the customer order

  }


  getAllPizzas() {
    this.pizzaService.getAllPizzas().then(pizzas => {
      this.pizzas = pizzas.sort((a: Pizza, b: Pizza) =>
        a.name > b.name ? 1 : -1
      );
    });
  }

  calculate() {
    let subtotal: number = 0;
    let orders = this.myForm.value.pizzaQuantity;

    orders.map(order => {
        if (order.pizzaId) {
          let piz = this.pizzas.find(pizza => pizza._id == order.pizzaId);
          subtotal += piz.price * order.quantity;
        }
      }
    );
    this.total = subtotal;
  }
}
