import Button from '@/ui/Button/Button';
import styles from './CreateProject.module.css';

const CreateProject = () => {
  return (
    <section className="container__create__project">
        <h4>Create Project</h4>

        <form className={`${styles.form__create__project}`}>
            <div>
                <label htmlFor="name" className={`${styles.label__project__name}`}>Project Name</label>
                <input type="text" name="project__name" className={`${styles.project__name}`} placeholder="Enter Your Project Name" />
            </div>
            <div className={`${styles.select__language__container}`}>
                <label htmlFor="language" className={`${styles.label__project__language}`}>Choose Project Language</label>
                <select className={`${styles.project__language}`} name="project__language">
                    <option className={`${styles.project__language__option}`} value="">JavaScript</option>
                    <option className={`${styles.project__language__option}`} value="">C</option>
                    <option className={`${styles.project__language__option}`} value="">C++</option>
                    <option className={`${styles.project__language__option}`} value="">Java</option>
                    <option className={`${styles.project__language__option}`} value="">Python</option>
                    <option className={`${styles.project__language__option}`} value="">Bash</option>
                </select>
            </div>

            <Button>Create Project</Button>
        </form>
    </section>
  )
}

export default CreateProject