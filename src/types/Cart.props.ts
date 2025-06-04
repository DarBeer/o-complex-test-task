import { IProduct } from "@/Interfaces"

export type CartPropType = {
    selectedItems: { id: number, 
                     quantity: number
                   }[],
    products: IProduct[]
}