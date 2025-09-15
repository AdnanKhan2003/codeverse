"use client";

import { useRouter } from "next/navigation";

import ProjectItem from "./ProjectItem/ProjectItem";
import { projectsData } from "@/app/data/projects";

import styles from "./Projects.module.css";

const Projects = () => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <div className={`${styles.container__projects}`}>
      {projectsData.map(project => 
      <ProjectItem key={project.id} project={project} onClick={handleClick} />
      )}
    </div>
  );
};

export default Projects;
