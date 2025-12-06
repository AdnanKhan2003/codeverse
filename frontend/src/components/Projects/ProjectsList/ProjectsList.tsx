"use client";

import { useRouter } from "next/navigation";

import ProjectItem from "../ProjectItem/ProjectItem";
import type { ProjectItemDataProps, ProjectsList } from "@/types/project";

import styles from "./ProjectsList.module.css";
import { useEffect, useState } from "react";
import { codeVerseApi } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getAccessToken } from "@/lib/features/auth/authSlice";

const ProjectsList = () => {
  const accessToken = useSelector(getAccessToken);
  const [projectsData, setProjectsData] = useState<ProjectItemDataProps[] | null>([]);
  const [showEditInput, setShowEditInput] = useState(false);
  const [editInputData, setEditInputData] = useState("");
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
    console.log("projectData", projectsData);

  }, []);

  const handleClickDeleteProjectName = (id: string) => {
    const deleteProject = async () => {
      const response = await codeVerseApi.delete(`project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.data.data;
      setProjectsData(prevState => prevState?.filter(p => p.id !== id) || [])
    };
    deleteProject();
  };

  const handleClickEditProjectName = (id: string, name: string) => {
    const editProjectName = async () => {
      const response = await codeVerseApi.post(`/project/update/project-name/${id}`, {
        name
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.data.data;
      console.log("edit sucessful", data, "wwwwthekkldklsjsjd;lj");
    setShowEditInput(false);
    setProjectsData(prevState => prevState?.map(p => p.id === id ? { ...p, name } : p) || []);

    };
    editProjectName();
    console.log("Edit: ", id, name);
  };

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  return (
    <>
      <div className={`${styles.container__projects}`}>
        {projectsData?.map((project: ProjectItemDataProps
        ) => {
          console.log("me hi to bro", project);

          return (
            <ProjectItem 
            key={project.id} 
            project={project} 
            onEditName={handleClickEditProjectName} 
            onDeleteName={handleClickDeleteProjectName} 
            showEditInput={showEditInput} 
            setShowEditInput={setShowEditInput}
            onClick={handleClick} 
            editInputData={editInputData}
            setEditInputData={setEditInputData}
            />
          )
        })}

      </div>
    </>

  );
};

export default ProjectsList;
