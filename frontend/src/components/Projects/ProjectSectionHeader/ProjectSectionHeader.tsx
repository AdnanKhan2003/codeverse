"use client";

import { useState } from "react";

import Button from "@/ui/Button/Button";
import ModalPortal from "@/ui/Modal/Modal";

import styles from "./ProjectSectionHeader.module.css";
import CreateProject from "../CreateProject/CreateProject";

const ProjectSectionHeader = () => {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
      <ModalPortal showModal={showModal} onClose={() => setShowModal(false)}>
        <CreateProject />
      </ModalPortal>

      <div className={`${styles.project__section__header}`}>
        <div className="welcome__container">👋 Hi, Adnan</div>

        <Button size="large" onClick={() => setShowModal(true)}>Create Project</Button>
      </div>
    </>
  );
};

export default ProjectSectionHeader;
