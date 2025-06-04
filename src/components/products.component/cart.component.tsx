import { CartPropType } from "@/types/Cart.props";
import { PhoneInput } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { OrderService } from "@/services/order.service";
import { usePushUp } from "@/hooks/usePushUp";
import { PushUp } from "../ui/push-up";
import { useOrder } from "@/providers/Order.provider";

export function Cart({ selectedItems, products }: CartPropType) {
    const { order, sendOrder, updatePhone } = useOrder();
    const { currentMessage, showPushUp, hidePushUp } = usePushUp();

    const [wrongFields, setWrongFields] = useState<string[]>([]);

    const checkForm = useCallback(() => {
        let newWrongFields: string[] = [];
        if (selectedItems.length === 0) {
            newWrongFields.push("cart");
        }
        if (order.phone.length < 11) {
            newWrongFields.push("phone");
        }
        
        setWrongFields(newWrongFields);
        
        if (newWrongFields.length > 0) {
            showPushUp("Заполните поля: " + newWrongFields.join(", "), "warn");
            return false;
        }
        
        return true;
    }, [selectedItems, order]);

    const sendForm = () => {
        if (checkForm()) {
            sendOrder().then(res => {
                const status = res?.success ? { message: "Успешно отправленно", staus: "success" }
                                            : { message: "Что-то пошло не так...", staus: "warn"};
                showPushUp(status.message, status.staus as ("success" | "warn"));
            })       
        }
        
    }

    return (
        <>
            <div className="products--cart">
                <div className="products--cart--title">
                    <h3>Добавленные товары</h3>
                </div>
                <div className="products--cart--list">
                    { selectedItems.map(item => {
                        const currentProduct = products.find(product => product.id === item.id);
                        return (
                            <div className="products--cart--list--item" key={item.id}>
                                <div className="products--cart--list--item--title">
                                    <p>{currentProduct?.title}</p>
                                </div>
                                <div className="products--cart--list--item--price">
                                    <div>
                                        <p>x{item.quantity}</p>
                                    </div>
                                    <div>
                                        <p>{(currentProduct?.price || 0) * item.quantity}₽</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="products--cart--control">
                    <div>
                        <PhoneInput value={order.phone || ""} className={wrongFields?.includes("phone") ? "warn" : ""} onChange={cleatPhone => updatePhone(cleatPhone as string)} />
                    </div>
                    <div>
                        <Button onClick={sendForm}>заказать</Button>
                    </div>
                </div>
            </div>
            { currentMessage && (
                <PushUp
                message={currentMessage.message}
                type={currentMessage.type}
                onClose={hidePushUp}
                showProgress={true}
                />
            )}
        </>
    )
}