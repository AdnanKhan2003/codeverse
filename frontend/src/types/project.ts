import { AuthUser } from "./auth";

type Project = {
    id: string;
    name: string;
    code: string;
    version: string;
    // projectLanguage: string;
    projectlanguage: string;
    createdby: AuthUser;
    // createdAt: Date;
    // updatedAt: Date;
    createdat: Date;
    updatedat: Date;
};

type ProjectProps = {
    project: Project;
    onClick: (id: string) => void;
    // onEditName: (id: string, name: string) => void;
};

type ProjectsList = {
    projects: Project[];
};


type ProjectItemProps = {
    id: string;
    name: string;
    code: string;
    language: string;
    version: string;
    createdBy: AuthUser;
}


export type { Project, ProjectProps, ProjectsList, ProjectItemProps };