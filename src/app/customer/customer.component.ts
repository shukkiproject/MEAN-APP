import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Customer, Pizza} from "../pizza";
import {PizzaService} from '../pizza.service';

@Component({
  moduleId: module.id,
  selector: 'app-customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.css']
})
export class CustomerComponent implements OnInit {
  public pizzas: Pizza[];
  public total: number;

  public myForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private pizzaService: PizzaService) {
  }

  ngOnInit() {
    this.getAllPizzas();
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      order: this._fb.array([
        this.initOrder(),
      ])
    });
  }

  getAllPizzas() {
    this.pizzaService.getAllPizzas().then(pizzas => {
      this.pizzas = pizzas.sort((a: Pizza, b: Pizza) =>
        a.name > b.name ? 1 : -1
      );
    });
  }

  initOrder() {
    return this._fb.group({
      pizza: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }


  addOrder() {

    const control = <FormArray>this.myForm.controls['order'];
    control.push(this.initOrder());
  }

  removeOrder(i: number) {

    const control = <FormArray>this.myForm.controls['order'];
    control.removeAt(i);
  }


  save(customerOrder: Customer) {

    console.log(customerOrder);

    // todo : create API and service to save the customer order

  }
}
