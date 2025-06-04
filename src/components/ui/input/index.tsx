import { PhoneInputProps } from "@/types/PhoneInput.props";
import { useState, useEffect, useRef } from "react";

import "./input.css";

export function PhoneInput({ value = "", onChange, ...props }: PhoneInputProps) {
    const [displayValue, setDisplayValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const formatPhone = (input: string): string => {
    const numbers = input.replace(/\D/g, "").substring(0, 11);
    
    if (!numbers) return "";
    
    let formatted = "+7 ";
    if (numbers.length > 1) {
      formatted += `(${numbers.substring(1, 4)}`;
    }
    if (numbers.length >= 4) {
      formatted += `) ${numbers.substring(4, 7)}`;
    }
    if (numbers.length >= 7) {
      formatted += `-${numbers.substring(7, 9)}`;
    }
    if (numbers.length >= 9) {
      formatted += `-${numbers.substring(9, 11)}`;
    }
    
    return formatted;
  };

  const getCleanPhone = (formatted: string): string => {
    const numbers = formatted.replace(/\D/g, "");
    return numbers.startsWith("7") ? numbers : "7" + numbers;
  };

  useEffect(() => {
    setDisplayValue(formatPhone(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbers = input.replace(/\D/g, "").substring(0, 11);
    const formatted = formatPhone(numbers);
    
    setDisplayValue(formatted);
    
    if (onChange) {
      const cleanPhone = getCleanPhone(formatted);
      onChange(cleanPhone);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && displayValue.length === 7 && inputRef.current) {
      const numbers = displayValue.replace(/\D/g, "").slice(0, -1);
      const formatted = formatPhone(numbers);
      setDisplayValue(formatted);
      
      if (onChange) {
        onChange(getCleanPhone(formatted));
      }
    }
  };

  return (
    <input type="tel"
           ref={inputRef}
           value={displayValue}
           onChange={handleChange}
           onKeyDown={handleKeyDown}
           placeholder="+7 (___) ___-__-__"
           maxLength={18}
           {...props}
           className={`ui--phone-input ${props.className || ""}`}
    />
  );
};