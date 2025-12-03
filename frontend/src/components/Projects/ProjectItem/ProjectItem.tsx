import Image, { StaticImageData } from 'next/image';
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

import Button from '@/ui/Button/Button';
import type { ProjectProps } from "@/types/project";

import pythonLogo from "@/assets/logos/python.png"
import bashLogo from "@/assets/logos/bash.png"
import cLogo from "@/assets/logos/c.png"
import cppLogo from "@/assets/logos/cpp.png"
import javaLogo from "@/assets/logos/java.png"
import javascriptLogo from "@/assets/logos/javascript.png"

import styles from './ProjectItem.module.css';

const mainLogo = "/logos/codeverse_logo.png";

const languageLogos : Record<string, StaticImageData> = {
  python: pythonLogo,
  bash: bashLogo,
  c: cLogo,
  cpp: cppLogo,
  java: javaLogo,
  javascript: javascriptLogo,
};

const ProjectItem = ({ project, onClick }: ProjectProps) => {
  const logoImg = languageLogos[project.projectlanguage] ?? mainLogo;
  console.log('w', project, project.projectlanguage, languageLogos[project.projectlanguage]);
  
  
  return (
    <div className={`${styles.project__item}`} onClick={() => onClick(project.id)}>
        <div className={`${styles.project__item__language}`}>
          <Image src={logoImg} height={35} width={35} alt="Project Language" />
        </div>

        <div className={`${styles.project__item__text__content}`}>
          <div className={`${styles.project__item__info}`}>
            <h5 className="project__item__info__title">{project.name}</h5>
            <p className="project__item__info__date">{new Date(project.createdat).toLocaleDateString()}</p>
          </div>

          <div className={`${styles.project__item__btns__container}`}>
            <Button name="edit" type="button" size="small" style={{ marginRight: '1rem' }} Icon={MdModeEdit} />
            <Button name="delete" type="button" size="small" Icon={AiFillDelete} classes="button__delete" />
            {/* <button className="button btn__edit">Edit</button>
            <button className="button btn__delete">Delete</button> */}
          </div>
        </div>
      </div>
  );
}

export default ProjectItem