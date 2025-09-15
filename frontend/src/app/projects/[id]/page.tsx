"use client";

import { Editor } from "@monaco-editor/react";
import styles from "./page.module.css";

const ProjectDetails = () => {
  return (
    <section className={`${styles.project__details__container}`}>
      <div className={`${styles.code__container}`}>
        <Editor theme="vs-dark" />
      </div>
      <section className={`${styles.output__container}`}>
        <h3>Output</h3>
      </section>
    </section>
  );
};

export default ProjectDetails;
