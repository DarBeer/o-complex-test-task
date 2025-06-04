import { InputHTMLAttributes } from "react";

export type PhoneInputProps = InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  onChange?: (phone: string) => void;
}