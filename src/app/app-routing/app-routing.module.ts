import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PizzasComponent} from "../pizzas/pizzas.component";
import {PizzaDetailComponent} from "../pizza-detail/pizza-detail.component";
import {CustomerComponent} from "../customer/customer.component";

// Define the routes
const ROUTES = [
    {path: '', redirectTo: 'pizzas', pathMatch: 'full'},
    {path: 'pizzas', component: PizzasComponent},
    {path: 'pizzas/:id', component: PizzaDetailComponent},
    {path: 'customer', component: CustomerComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
