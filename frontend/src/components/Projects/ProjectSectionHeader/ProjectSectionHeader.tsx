import Button from '@/app/ui/Button/Button';
import styles from './ProjectSectionHeader.module.css';

const ProjectSectionHeader = () => {
  return (
    <div className={`${styles.project__section__header}`}>

        <div className="welcome__container">
           👋 Hi, Adnan
        </div>

        <Button size="large">Create Project</Button>
    </div>
  )
}

export default ProjectSectionHeader