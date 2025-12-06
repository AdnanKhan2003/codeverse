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

type ProjectItemProps = {
    project: Project;
    onClick: (id: string) => void; 
    onEditName: (id: string, name: string) => void;
    onDeleteName: (id: string) => void;
    showEditInput: boolean; 
    setShowEditInput: (show: boolean) => void;
    editInputData: string;
    setEditInputData: (value: string) => void;
};

type ProjectsList = {
    projects: Project[];
};


type ProjectItemDataProps = {
    id: string;
    name: string;
    code: string;
    createdby: AuthUser;
    projectlanguage: string;
    version: string;
    createdat: Date;
    updatedat: Date;
    project: Project;
}


export type { Project, ProjectItemProps, ProjectsList, ProjectItemDataProps };