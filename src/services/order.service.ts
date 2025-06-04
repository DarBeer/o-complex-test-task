import { IOrder } from "@/Interfaces";

export class OrderService {
    public async post({phone, ...order}: IOrder) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            ...order,
            phone: phone.replace(/\D/g, '')
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response?.status || "нет данных"}`);
        }

        const data = await response.json();
        return data
        } catch (err) {
            console.error('Ошибка при отправке:', err);
        }
    }
}