import {PizzaQuantity} from "./pizza-quantity";
export interface Order {
  client: string;
  address: string;
  PizzaQuantity: PizzaQuantity[];
}
