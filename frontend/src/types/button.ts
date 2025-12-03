import { ReactNode, CSSProperties, MouseEvent } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
    children?: ReactNode;
    name?: string;
    type?: "button" | "submit" | "reset";
    size?: "small" | "medium" | "large";
    style?: CSSProperties;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    classes?: string;
    Icon?: IconType;
};

export type { ButtonProps };