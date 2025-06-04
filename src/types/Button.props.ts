import React from "react";

export type ButtonPropsType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export type IncSelectorButtonsPropsType = ButtonPropsType & {
    value: number,
    onValueChange: (value: number) => void
 }