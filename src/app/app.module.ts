import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {PizzaService} from "./pizza.service";
import { PizzasComponent } from './pizzas/pizzas.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { OrderComponent } from './order/order.component';
import { PizzaQuantityComponent } from './pizza-quantity/pizza-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzasComponent,
    PizzaDetailComponent,
    PizzaQuantityComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
