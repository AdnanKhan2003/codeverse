import Image, { StaticImageData } from 'next/image';

import Button from '@/app/ui/Button/Button';
import type { ProjectProps } from "@/app/types";

import styles from './ProjectItem.module.css';

import pythonLogo from "@/assets/logos/python.png"
import bashLogo from "@/assets/logos/bash.png"
import cLogo from "@/assets/logos/c.png"
import cppLogo from "@/assets/logos/cpp.png"
import javaLogo from "@/assets/logos/java.png"
import javascriptLogo from "@/assets/logos/javascript.png"

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
  const logoImg = languageLogos[project.projectLanguage] ?? mainLogo;
  
  return (
    <div className={`${styles.project__item}`} onClick={() => onClick(project.id)}>
        <div className={`${styles.project__item__language}`}>
          <Image src={logoImg} height={35} width={35} alt="Project Language" />
        </div>

        <div className={`${styles.project__item__text__content}`}>
          <div className={`${styles.project__item__info}`}>
            <h5 className="project__item__info__title">{project.projectName}</h5>
            <p className="project__item__info__date">{project.date}</p>
          </div>

          <div className="project__item__btns__container">
            <Button name="edit" type="button" style={{ marginRight: '1rem' }}>Edit</Button>
            <Button name="edit" type="button">Delete</Button>
            {/* <button className="button btn__edit">Edit</button>
            <button className="button btn__delete">Delete</button> */}
          </div>
        </div>
      </div>
  );
}

export default ProjectItem