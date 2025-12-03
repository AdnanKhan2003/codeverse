"use client";

import { Editor } from "@monaco-editor/react";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Button from "@/ui/Button/Button";
import { codeVerseApi } from "@/lib/axios";
import { getAccessToken } from "@/lib/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

type ProjectProps = {
  code: string;
  createdat: Date;
  createdby: string;
  updatedat: Date;
  id: string;
  name: string;
  projectlanguage: string;
  version: string;
};

type OutputProps = {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: string;
    signal: string;
    output: string;
  };
} | null;

const ProjectDetails = () => {
  const [ code, setCode ] = useState("");
  const [ project, setProject ] = useState<ProjectProps | null>();
  const [ output, setOutput ] = useState<OutputProps>(null);
  const accessToken = useSelector(getAccessToken);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await codeVerseApi.get(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.data.data;
      setProject(data);
      setCode(data.code || "");
      console.log("lol: ", data);
      
    };

    getProjectDetails();
  }, [id, accessToken]);

  const handleClickSaveCode = () => {
    const saveCode = async () => {
      const response = await codeVerseApi.post(`/project/update/${id}`, {
        code
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.data;
      console.log("Saved data: ", data);
      
    };

    saveCode();
  };

  const handleClickExecuteCode = () => {
    const executeCode = async () => {
      console.log(project, "gg", code);
      
      const response = await codeVerseApi.post("/code/execute-code", {
        language: project?.projectlanguage,
        version: project?.version,
        code,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = response.data.data;
      setOutput(data);
      console.log("gg", data);
      
    };

    executeCode();
  };

  return (
    <section className={`${styles.project__details__container}`}>
      <Button onClick={handleClickExecuteCode} name="run" style={{ position: 'absolute', top: 0, right: 0, margin: '1rem 1rem 0 0' }}>Run</Button>
      <Button onClick={handleClickSaveCode} name="save">Save</Button>
      <div className={`${styles.code__container}`}>
        <Editor 
        theme="vs-dark" 
        value={code}
        defaultLanguage="javascript"
        onChange={(value) => setCode(value ?? "")}
        />
      </div>
      <section className={`${styles.output__container}`}>
        <h3>Output</h3>
        <p className={`${output?.run?.stderr !== "" && styles.error}`}>{output?.run?.output || ""}</p>
      </section>
    </section>
  );
};

export default ProjectDetails;
