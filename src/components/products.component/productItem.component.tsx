import { IProduct } from "@/Interfaces";
import { ImagePreloader } from "./imagePreloader.component";
import { Button, IncSelectorButtons } from "../ui/button";
import { ProductItemProps } from "@/types/ProductItem.props";

export function ProductItem({item, count = 0, onChange}: ProductItemProps) {
    return (
        <>
            <div className="products--list--item--header">
                <ImagePreloader className="products--list--image"
                                width={400}
                                height={300}
                                src={item.image_url} alt="" />
                <h2 className="products--list--item--title">{item.title}</h2>
                <p className="products--list--item--description">{item.description}</p>
                
            </div>
            <div className="products--list--item--footer">
                <div>
                    <p className="products--list--item--price">Цена: <span>{item.price}</span>₽</p>
                </div>
                <div>
                    { count < 1 ? <Button onClick={() => onChange(1)}>Купить</Button>
                                : <IncSelectorButtons onValueChange={onChange} value={count}  />
                    }
                </div>
            </div>
        </>
    );
}