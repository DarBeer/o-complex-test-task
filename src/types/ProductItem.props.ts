import { IProduct } from "@/Interfaces"

export type ProductItemProps = { 
    item: IProduct, 
    count: number,
    onChange: (value: number) => void 
}