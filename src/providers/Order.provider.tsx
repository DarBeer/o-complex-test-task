'use client'

import { IOrder } from '@/Interfaces';
import { OrderService } from '@/services/order.service';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type OrderContextType = { 
  order: IOrder, 
  updateCart: (foundItemId: number) => (quantity: number) => void, 
  updatePhone: (phone: string) => void, 
  sendOrder: () => Promise<any> 
}

export const OrderContext = createContext<OrderContextType>({
  order: { phone: "", cart: [] },
  updateCart: () => () => {},
  updatePhone: () => {},
  sendOrder: () => new Promise<any>(() => {})
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const __orderService = new OrderService();

  const [order, setOrder] = useState<IOrder>({ phone: "", cart: [] });

  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    setOrder(savedOrder ? JSON.parse(savedOrder) : {phone: "", cart: []});
  }, []);

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order));
  }, [order]);

  const updateCart = (foundItemId: number) => (quantity: number) => setOrder(prev => {
        const currentItem = prev.cart.find(item => item.id === foundItemId);
        if (!currentItem) {
            return { ...prev, cart: [...prev.cart, {id: foundItemId, quantity}] }
        } 
        if (currentItem.quantity + quantity <= 0) {
            return { ...prev, cart: prev.cart.filter(item => item.id != currentItem.id)};
        }
        if (currentItem.quantity + quantity > 0) {
            return { ...prev,
                     cart: [ ...prev.cart.filter(item => item.id != currentItem.id), 
                             {...currentItem, quantity}
                           ].sort((a, b) => a.id > b.id ? 1 : -1)
            };
        };
        return prev;
    });

  const updatePhone = (phone: string) => {
    setOrder(prev => ({...prev, phone}))
  }

  const sendOrder = useCallback((): Promise<any> => {
    return __orderService.post(order);
  }, [order])

  return (
    <OrderContext.Provider value={{ order, updateCart, updatePhone, sendOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useCart must be used within a OrderProvider');
  }
  return context;
};