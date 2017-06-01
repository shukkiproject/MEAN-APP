
// todo: restructure and refactor interfaces
export interface Customer {
    name: string;
    address: string;
    order: Order[];
}

export interface Order {
    pizza: Pizza;
    quantity: number;
}

export interface Pizza {
    _id: string;
    name: string;
    type: string;
    recipe : string[];
    price: number;
}

