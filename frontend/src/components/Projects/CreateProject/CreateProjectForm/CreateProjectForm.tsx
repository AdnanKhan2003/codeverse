import Button from "@/ui/Button/Button";

import styles from "./CreateProjectForm.module.css";
import { MouseEvent, useEffect, useState } from "react";
import { codeVerseApi } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getAccessToken } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { codeData } from "@/data/code";

type Runtime = {
    language: string;
    version: string;
    languageWithVersion: string;
    aliases: string[]
}

const CreateProjectForm = ({ setShowModal }: { setShowModal: (show: boolean) => void }) => {
    const [fetchedLanguages, setFetchedLanguages] = useState<Runtime[]>([]);
    const [newProjectInfo, setNewProjectInfo] = useState({
        projectName: "",
        // projectCode: "",
        // projectLanguage: "",
        // projectVersion: "",
        projectNameAndVersion: ""
    });
    const router = useRouter();

    const handleClickCreateProject = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const projectCode = "";
        const [projectLanguage, projectVersion] = newProjectInfo.projectNameAndVersion.split(" ");
        // console.log("mai kaun hu", projectLanguage);
        // console.log("new project", newProjectInfo);

        const key = projectLanguage.trim() == "c++" ? "cPlusPlus" : projectLanguage.trim() as keyof typeof codeData;
        const codeBoilerTemplate = codeData[key];
        console.log("code boiler template", codeBoilerTemplate);

        const sendCode = projectCode !== "" ? projectCode : codeBoilerTemplate;

        const response = await codeVerseApi.post("/project/create-project", {
            name: newProjectInfo.projectName,
            code: sendCode,
            projectLanguage,
            version: projectVersion
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = response.data.data;
        console.log("done: ", data);
        setShowModal(false);

        router.push(`/projects/${data.id}`)
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
            const filteredData = data.data.filter((l: Runtime) => allowedLanguages.includes(l.language) || l.aliases.some(alias => allowedLanguages.includes(alias))).map((l: Runtime) => ({ language: l.language, version: l.version, languageWithVersion: `${l.language} ${l.version}` }));

            setFetchedLanguages(filteredData);

            const defaultLang = filteredData.find((l: Runtime) => l.language === "javascript");
            if (defaultLang) {
                setNewProjectInfo(prev => ({
                    ...prev,
                    projectNameAndVersion: defaultLang.languageWithVersion
                }));
            }
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
                        <option key={l.languageWithVersion} className={`${styles.project__language__option}`} value={l.languageWithVersion}>{l.languageWithVersion}</option>
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