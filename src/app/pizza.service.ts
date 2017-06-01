import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Pizza} from "./pizza";

@Injectable()
export class PizzaService {
    // prod /api/pizzas
    private pizzasUrl = 'http://localhost:3000/api/pizzas';
    constructor(private http: Http) { }

    // Get all pizza from the API
    getAllPizzas(): Promise<Pizza[]>  {

        // return this.http.get(this.pizzasUrl)
        //     .map(res => {
        //         console.log(res);
        //         return res.json();
        //     });
        return this.http.get(this.pizzasUrl)
            .toPromise()
            .then(response => response.json() as Pizza[]
            )
            .catch(this.handleError);
    }

    getPizza(id: string): Promise<Pizza> {

        const url = `${this.pizzasUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return response.json() as Pizza
            })
            .catch(this.handleError);
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    deleteP(id: string): Promise<void> {
        const url = `${this.pizzasUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    updatePizza(pizza: Pizza): Promise<Pizza> {

        const url = `${this.pizzasUrl}/${pizza._id}`;
        return this.http.put(url, JSON.stringify(pizza),{headers: this.headers})
            .toPromise()
            .then(response => response.json() as Pizza)
            .catch(this.handleError);
    }

    create(pizza: Pizza): Promise<Pizza> {
        return this.http
            .post(this.pizzasUrl, JSON.stringify(pizza), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Pizza)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}