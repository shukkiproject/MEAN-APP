import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Pizza} from "../pizza";

@Component({
  moduleId: module.id,
  selector: 'app-pizza-quantity',
  templateUrl: 'pizza-quantity.component.html',
  styleUrls: ['pizza-quantity.component.css']
})
export class PizzaQuantityComponent implements OnInit {
  @Input('group') pizzaForm: FormGroup;
  @Input() pizzas: Pizza[];
  @Output() quantity: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  sendQty() {
    this.quantity.emit(null);
  }
}
