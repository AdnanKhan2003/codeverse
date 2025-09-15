import { ReactNode, CSSProperties } from "react";

type ButtonProps = {
    children: ReactNode;
    name?: string;
    type?: "button" | "submit" | "reset";
    size?: "small" | "medium" | "large";
    style?: CSSProperties;
};

export { ButtonProps };