import ProjectItem from "./ProjectItem/ProjectItem";

import type { Project } from "@/app/types";
import styles from "./Projects.module.css";

const projectsData : Project[] = [
  {
    id: 1,
    projectName: "Abc",
    date: "5 Sept, 2025",
    projectLanguage: "python",
  },
  {
    id: 2,
    projectName: "Abc",
    date: "5 Sept, 2025",
    projectLanguage: "bash",
  },
  {
    id: 3,
    projectName: "Abc",
    date: "5 Sept, 2025",
    projectLanguage: "java",
  },
  {
    id: 4,
    projectName: "Abc",
    date: "5 Sept, 2025",
    projectLanguage: "javascript",
  },
  {
    id: 5,
    projectName: "Abc",
    date: "5 Sept, 2025",
    projectLanguage: "c",
  },
  {
    id: 6,
    projectName: "Abc",
    date: "5 Sept, 2025",
    projectLanguage: "cpp",
  },
];

const Projects = () => {
  return (
    <div className={`${styles.container__projects}`}>
      {projectsData.map(project => 
      <ProjectItem key={project.id} project={project} />
      )}
    </div>
  );
};

export default Projects;
