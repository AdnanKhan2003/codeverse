import ProjectSectionHeader from "@/components/Projects/ProjectSectionHeader/ProjectSectionHeader";
import Projects from "@/components/Projects/Projects";

import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={`${styles.container__home}`}>
      <div className={`${styles.container__home__wrapper}`}>
        <ProjectSectionHeader />
        <Projects />
      </div>
    </section>
  );
}
