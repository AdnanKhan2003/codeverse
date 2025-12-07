"use client";

import { useEffect, useState } from "react";

import Button from "@/ui/Button/Button";
import ModalPortal from "@/ui/Modal/Modal";

import styles from "./ProjectSectionHeader.module.css";
import CreateProject from "../CreateProject/CreateProject";
import { codeVerseApi } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getAccessToken } from "@/lib/features/auth/authSlice";
import { RootState } from "@/lib/store";

const ProjectSectionHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootState) => state.auth);
  const userName = user?.user?.fullname;
  // const userName = user?.user?.fullname || user?.user?.fullName;
  console.log("user", user, userName);

  return (
    <>
      <ModalPortal showModal={showModal} onClose={() => setShowModal(false)}>
        <CreateProject setShowModal={setShowModal} />
      </ModalPortal>

      <div className={`${styles.project__section__header}`}>
        <div className="welcome__container">👋 Hi, {userName}</div>

        <Button size="large" onClick={() => setShowModal(true)}>Create Project</Button>
      </div>
    </>
  );
};

export default ProjectSectionHeader;
