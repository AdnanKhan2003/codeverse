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

type ProjectsList = {
    projects: Project[];
};

export type { Project, ProjectProps, ProjectsList };