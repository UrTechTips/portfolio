import { getAllProjectsMeta } from '@/lib/projects';
import styles from "./projectPage.module.scss";
import ProjectsList from "@/components/projectsList/projectsList.component";
import Back from "@/components/backLink/backLink.component";
import { Metadata } from 'next';

export const metadata = {
  title: "Projects — Sai Sreenadh (STron)",
  description:
    "Explore projects by Sai Sreenadh (STron), spanning full-stack development, machine learning, computer vision, and GenAI.",
  keywords: [
    "Sai Sreenadh projects",
    "STron projects",
    "developer portfolio",
    "machine learning projects",
    "AI projects",
    "GenAI projects",
    "full-stack projects",
    "Next.js projects",
    "Python projects",
  ],
  authors: [{ name: "Sai Sreenadh" }],
};

const Projects = () => {
    const all = getAllProjectsMeta();

    return (
        <div className={styles.main}>
            <Back />
            <div className={styles.container}>
                <h1 className={styles.h1}>All Projects</h1>
                <div className={styles.projects}>
                    <ProjectsList projects={all} />
                </div>
            </div>
        </div>
    )
}


export default Projects;