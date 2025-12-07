"use client";

import { useRouter } from "next/navigation";

import ProjectItem from "../ProjectItem/ProjectItem";
import type { ProjectEditInputData, ProjectItemDataProps, ProjectsList } from "@/types/project";

import styles from "./ProjectsList.module.css";
import { useEffect, useState } from "react";
import { codeVerseApi } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getAccessToken } from "@/lib/features/auth/authSlice";

const ProjectsList = () => {
  const accessToken = useSelector(getAccessToken);
  const [projectsData, setProjectsData] = useState<ProjectItemDataProps[] | null>([]);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [showEditInput, setShowEditInput] = useState<ProjectEditInputData>({
    id: "",
    visible: false,
  });
  const [editInputData, setEditInputData] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      setIsProjectLoading(false);
      return;
    }

    const getProjects = async () => {
      try {
        setIsProjectLoading(true);
        const response = await codeVerseApi.get("/project/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.data;
        setProjectsData(data.data);
        console.log("All Data: ", data);


      } catch (error) {
        console.log("Error fetching projects", error);
      }
      finally {
        setIsProjectLoading(false);
      }
    };

    getProjects();

  }, [accessToken]);

  const handleClickDeleteProjectName = (id: string) => {
    try {
      const deleteProject = async () => {
        const response = await codeVerseApi.delete(`project/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const data = await response.data.data;
        console.log("Deleted Data: ", data);
        setProjectsData(prevState => prevState?.filter(p => p.id !== id) || [])
      };
      deleteProject();
    } catch (error) {
      console.log("Error deleting project", error);
    }
  };

  const handleClickEditProjectName = (id: string, name: string) => {
    const editProjectName = async () => {
      try {
        const response = await codeVerseApi.post(`/project/update/project-name/${id}`, {
          name
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const data = await response.data.data;
        console.log("edit sucessful", data, "wwwwthekkldklsjsjd;lj");
        setShowEditInput(prevState => ({ ...prevState, visible: false }));
        setProjectsData(prevState => prevState?.map(p => p.id === id ? { ...p, name } : p) || []);

      } catch (error) {
        console.log("Error editing project", error);
      }
    };
    editProjectName();

  };

  const handleClick = (id: string) => {
    router.push(`/projects/${id}`);
  };

  if (isProjectLoading) return <p>Loading...</p>;

  return (
    <>
      <div className={`${styles.container__projects}`}>
        {!isProjectLoading && projectsData?.length === 0 && <p>No Projects Found</p>}
        {projectsData && projectsData?.map((project: ProjectItemDataProps
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
