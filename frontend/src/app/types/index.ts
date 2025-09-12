import { ReactNode, CSSProperties } from "react";

type ButtonProps = {
    children: ReactNode;
    name?: string;
    type?: "button" | "submit" | "reset";
    size?: "small" | "medium" | "large";
    style?: CSSProperties;
};

type Project = {
    id: number;
    projectName: string;
    date: string;
    projectLanguage: string;
};

type ProjectProps = {
    project: Project;
};

export type { ButtonProps, Project, ProjectProps };