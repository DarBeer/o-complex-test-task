'use client'

import { IProduct } from "@/Interfaces";
import { ProductService } from "@/services/product.setvice";
import { useCallback, useEffect, useState } from "react";
import { ProductItem } from "./productItem.component";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import "./products.component.css";
import { Cart } from "./cart.component";
import { useOrder } from "@/providers/Order.provider";

export function Producrts() {
    const __productService = new ProductService();

    const { order, updateCart } = useOrder();

    const { items, isLoading, lastItemRef, hasMore } = useInfiniteScroll<IProduct>(6, __productService.getReview);

    return (
        <div className="products--layout">
            {order.cart.length > 0 && <Cart products={items} selectedItems={order.cart} />}
            <div className="products--list" ref={items.length === 0 ? lastItemRef : null}>
                {   items.map((item, index) => 
                    <div key={item.id} 
                         ref={index === items.length - 1 ? lastItemRef : null} 
                         className="products--list--item">
                            <ProductItem item={item} 
                                         count={order.cart.find(foundItem => item.id === foundItem?.id)?.quantity || 0}
                                         onChange={updateCart(item.id)}/>
                    </div>)
                }
                {isLoading && <h1>LOADING</h1>}
                {!hasMore && <>LIST END</>}
            </div>
        </div>
    );
}