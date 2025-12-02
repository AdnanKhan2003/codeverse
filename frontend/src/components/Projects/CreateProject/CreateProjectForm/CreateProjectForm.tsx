import Button from "@/ui/Button/Button";

import styles from "./CreateProjectForm.module.css";
import { MouseEvent, useEffect, useState } from "react";
import { codeVerseApi } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getAccessToken } from "@/lib/features/auth/authSlice";

type Runtime = {
    language: string;
    version: string;
    languageWithVersion: string;
}

const CreateProjectForm = () => {
    const [ fetchedLanguages, setFetchedLanguages ] = useState<Runtime[]>([]);
    const [ newProjectInfo, setNewProjectInfo ] = useState({
        projectName: "",
        // projectCode: "",
        // projectLanguage: "",
        // projectVersion: "",
        projectNameAndVersion: ""
    });

    const handleClickCreateProject = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const projectCode = "";
        const [ projectName, projectVersion ] = newProjectInfo.projectNameAndVersion.split(" ");
        console.log(fetchedLanguages);
        console.log(newProjectInfo.projectName);
        console.log(projectVersion);
        console.log(projectCode);
        console.log(newProjectInfo.projectNameAndVersion);
        
    };

    const accessToken = useSelector(getAccessToken);

    const getRuntimes = async () => {
        try {
            const res = await codeVerseApi.get("/code/runtimes", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const data = await res.data;
            const allowedLanguages = ["java", "javascript", "c", "c++", "bash"]
            const filteredData = data.data.filter((l: Runtime) => allowedLanguages.includes(l.language)).map((l: Runtime) => ({ language: l.language, version: l.version, languageWithVersion: `${l.language} ${l.version}` }));

            setFetchedLanguages(filteredData);
            

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!accessToken) return;
        getRuntimes();
    }, [accessToken]);
    return (
        <form className={`${styles.form__create__project}`}>
            <div>
                <label htmlFor="name" className={`${styles.label__project__name}`}>Project Name</label>
                <input
                 type="text" 
                 name="project__name" 
                 value={newProjectInfo.projectName}
                 onChange={(e) => setNewProjectInfo(prevState => ({ ...prevState, projectName: e.target.value }))}
                 className={`${styles.project__name}`} 
                 placeholder="Enter Your Project Name" />
            </div>
            <div className={`${styles.select__language__container}`}>
                <label htmlFor="language" className={`${styles.label__project__language}`}>Choose Project Language</label>
                <select 
                className={`${styles.project__language}`} 
                name="project__language"
                value={newProjectInfo.projectNameAndVersion}
                onChange={(e) => setNewProjectInfo(prevState => ({ ...prevState, projectNameAndVersion: e.target.value }))}
                >
                    {/* {fetchedLanguages.} */}
                    {fetchedLanguages.map(l =>
                        <option className={`${styles.project__language__option}`} value={l.languageWithVersion}>{l.languageWithVersion}</option>
                    )}
                    {/* <option className={`${styles.project__language__option}`} value="">JavaScript</option>
                    <option className={`${styles.project__language__option}`} value="">C</option>
                    <option className={`${styles.project__language__option}`} value="">C++</option>
                    <option className={`${styles.project__language__option}`} value="">Java</option>
                    <option className={`${styles.project__language__option}`} value="">Python</option>
                    <option className={`${styles.project__language__option}`} value="">Bash</option> */}
                </select>
            </div>

            <Button onClick={handleClickCreateProject}>Create Project</Button>
        </form>
    );
}

export default CreateProjectForm