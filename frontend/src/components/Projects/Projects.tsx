import { projectsData } from "@/data/projects";
import ProjectsList from "./ProjectsList/ProjectsList";

const Projects = () => {
  return (
    <ProjectsList projects={projectsData} />
  );
};

export default Projects;
