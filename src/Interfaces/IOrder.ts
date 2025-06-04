export interface IOrder {
    phone: string;
    cart: { id: number, 
            quantity: number 
          }[]
}