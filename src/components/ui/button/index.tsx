import { ButtonPropsType, IncSelectorButtonsPropsType } from "@/types/Button.props";
import "./button.css"
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

export function Button(props: ButtonPropsType) {
    return (<button {...props} className={`ui--button ${props.className || ""}`} />)
}

export function IncSelectorButtons({onValueChange, value: propValue, ...props}: IncSelectorButtonsPropsType) {
    const [displayValue, setDisplayValue] = useState<string>('');
    const [internalValue, setInternalValue] = useState<number>(propValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInternalValue(propValue);
        setDisplayValue(propValue === 0 ? '' : propValue.toString());
    }, [propValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
        setDisplayValue(value);
        }
    };

    const saveValue = (newValue: number) => {
        const normalizedValue = newValue as number;
        setInternalValue(normalizedValue);
        onValueChange(normalizedValue);
        setDisplayValue(normalizedValue === 0 ? '' : normalizedValue.toString());
    };

    const increment = () => {
        saveValue(internalValue + 1);
    };

    const decrement = () => {
        saveValue(internalValue - 1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
        const numValue = displayValue === '' ? 0 : parseInt(displayValue, 10);
        saveValue(numValue);
        }
    };

    const handleBlur = () => {
        const numValue = displayValue === '' ? 0 : parseInt(displayValue, 10);
        saveValue(numValue);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            const numValue = displayValue === '' ? 0 : parseInt(displayValue, 10);
            saveValue(numValue);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [displayValue]);

    return (
        <div className="ui--numeratic-input">
            <div className="ui--numeratic-input--controll">
                <Button onClick={decrement}
                        disabled={internalValue <= 0}>
                    -
                </Button>
            </div>
            <div className="w-max">
                <input ref={inputRef}
                       className="ui--numeratic-input--input"
                       type="text"
                       inputMode="numeric"
                       pattern="[0-9]*"
                       value={displayValue}
                       onChange={handleChange}
                       onKeyDown={handleKeyDown}
                       onBlur={handleBlur} />
            </div>
            <div className="ui--numeratic-input--controll">
                <Button onClick={increment}>+</Button>
            </div>
        </div>
    )
}