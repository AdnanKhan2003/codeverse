"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import ProjectItem from "../ProjectItem/ProjectItem";
import { codeVerseApi } from "@/app/lib/axios";
import type { ProjectsList } from "@/app/types/project";

import styles from "./ProjectsList.module.css";

const ProjectsList = ({ projects }: ProjectsList) => {
  const router = useRouter();

  // const getRuntimes = async () => {
  //   const res = await codeVerseApi.get("/code/runtimes");
  //   const data = await res.data;
  //   console.log(data);
    
  // };

  // useEffect(() => {
    

  //   getRuntimes();
  // }, []);

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <div className={`${styles.container__projects}`}>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} onClick={handleClick} />
      ))}
    </div>
  );
};

export default ProjectsList;
