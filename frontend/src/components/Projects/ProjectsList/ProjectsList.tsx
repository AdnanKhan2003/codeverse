"use client";

import { useRouter } from "next/navigation";

import ProjectItem from "../ProjectItem/ProjectItem";
import type { ProjectItemProps, ProjectsList } from "@/types/project";

import styles from "./ProjectsList.module.css";
import { useEffect, useState } from "react";
import { codeVerseApi } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getAccessToken } from "@/lib/features/auth/authSlice";

const ProjectsList = () => {
  const accessToken = useSelector(getAccessToken);
  const [ projectsData, setProjectsData ] = useState<ProjectItemProps[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    const getProjects = async () => {
      const response = await codeVerseApi.get("/project/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.data;
      setProjectsData(data.data);
      console.log("All Data: ", data);
      
    };

    getProjects();
  }, []);
  
  const handleClickDeleteProjectName = (id: string, name: string) => {
    const deleteProject = async () => {
      const response = await codeVerseApi.delete(`project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.data.data;
      setProjectsData(prevState => )
    };
    deleteProject();
  };

  const handleClickEditProjectName = (id: string, name: string) => {
    const editProjectName = async () => {
      const response = await codeVerseApi.post(`/projects/update/project-name/${id}`, {
        name
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

    const data = await response.data.data;
    console.log(data, "wwwwthekkldklsjsjd;lj");
    
    };
    // editProjectName();
  };

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <>
    <div className={`${styles.container__projects}`}>
      {projectsData?.map((project: ProjectItemProps
      ) => (
        <ProjectItem key={project.id} project={project} onEditName={handleClickEditProjectName} onClick={handleClick} />
      ))}
      
    </div>
    </>

  );
};

export default ProjectsList;
