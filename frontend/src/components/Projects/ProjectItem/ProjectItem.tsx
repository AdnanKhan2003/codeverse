import Image, { StaticImageData } from 'next/image';
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import Button from '@/ui/Button/Button';
import type { ProjectItemProps } from "@/types/project";

import pythonLogo from "@/assets/logos/python.png"
import bashLogo from "@/assets/logos/bash.png"
import cLogo from "@/assets/logos/c.png"
import cppLogo from "@/assets/logos/cpp.png"
import javaLogo from "@/assets/logos/java.png"
import javascriptLogo from "@/assets/logos/javascript.png"

import styles from './ProjectItem.module.css';
import { ChangeEvent, MouseEvent } from 'react';

const mainLogo = "/logos/codeverse_logo.png";

const languageLogos: Record<string, StaticImageData> = {
  python: pythonLogo,
  bash: bashLogo,
  c: cLogo,
  cpp: cppLogo,
  java: javaLogo,
  javascript: javascriptLogo,
};

const ProjectItem = ({
  project,
  onClick,
  onEditName,
  onDeleteName,
  showEditInput,
  setShowEditInput,
  editInputData,
  setEditInputData
}: ProjectItemProps) => {
  const logoImg = languageLogos[project.projectlanguage] ?? mainLogo;
  console.log('w', project, project.projectlanguage, languageLogos[project.projectlanguage]);

  const handleDeleteProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDeleteName(project.id);
  };

  // const handleEditProject = (e: MouseEvent<HTMLButtonElement>) => {
  // }
  const handleShowEditProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowEditInput(true);
  };

  return (
    <div className={`${styles.project__item}`} onClick={() => onClick(project.id)}>
      <div className={`${styles.project__item__language}`}>
        <Image src={logoImg} height={35} width={35} alt="Project Language" />
      </div>

      <div className={`${styles.project__item__text__content}`}>
        <div className={`${styles.project__item__info}`}>
          {showEditInput ? (<>
            <input
              value={editInputData}
              onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.stopPropagation();
                setEditInputData(e.target.value);
              }}
              type="text"
              placeholder="Edit Project Name" />
            <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onEditName(project.id, editInputData);
            }}>Edit</button>
            <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setShowEditInput(false);
            }}>Cancel</button>
          </>) :
            <h5 className="project__item__info__title">{project.name}</h5>
          }
          <p className="project__item__info__date">{new Date(project.createdat).toLocaleDateString()}</p>
        </div>

        <div className={`${styles.project__item__btns__container}`}>
          <Button name="edit" type="button" size="small" onClick={handleShowEditProject} style={{ marginRight: '1rem' }}
            // onClick={() => onEditName(project.id)} 
            Icon={MdModeEdit} />
          <Button name="delete" type="button" size="small" Icon={AiFillDelete} onClick={handleDeleteProject} classes="button__delete" />
          {/* <button className="button btn__edit">Edit</button>
            <button className="button btn__delete">Delete</button> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectItem