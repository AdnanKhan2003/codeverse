"use client";

import { projectsData } from "@/data/projects";
import ProjectsList from "./ProjectsList/ProjectsList";
import { useEffect } from "react";
import { codeVerseApi } from "@/lib/axios";

const Projects = () => {
    const getRuntimes = async () => {
    const res = await codeVerseApi.get("/code/runtimes");
    const data = await res.data;
    console.log(data);
    
  };

  useEffect(() => {
    getRuntimes();
  }, []);

  return (
    <ProjectsList projects={projectsData} />
  );
};

export default Projects;
