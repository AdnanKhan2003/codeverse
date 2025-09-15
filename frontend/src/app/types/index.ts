import { ReactNode, CSSProperties } from "react";

type ButtonProps = {
    children: ReactNode;
    name?: string;
    type?: "button" | "submit" | "reset";
    size?: "small" | "medium" | "large";
    style?: CSSProperties;
};

type Project = {
    id: string;
    projectName: string;
    date: string;
    projectLanguage: string;
};

type ProjectProps = {
    project: Project;
    onClick: (id: string) => void;
};

export type { ButtonProps, Project, ProjectProps };