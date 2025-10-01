"use client";

import { useRouter } from "next/navigation";

import ProjectItem from "../ProjectItem/ProjectItem";
import type { ProjectsList } from "@/types/project";

import styles from "./ProjectsList.module.css";

const ProjectsList = ({ projects }: ProjectsList) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <>
    <div className={`${styles.container__projects}`}>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} onClick={handleClick} />
      ))}
    </div>
    </>

  );
};

export default ProjectsList;
