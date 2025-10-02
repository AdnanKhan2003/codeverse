import { ChangeEvent, MouseEvent } from "react";

type InputProps = { 
    children: string;
    type: string;
    name: string;
    placeholder: string;
    inputErrors: Record<string, string>;
    onChange?: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    value?: string;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    showPassword?: boolean;
};

type GuestLogin = {
    email: string;
    password: string;
};

export type { InputProps, GuestLogin };