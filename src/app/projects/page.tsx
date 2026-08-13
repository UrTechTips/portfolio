import { getAllProjectsMeta } from '@/lib/projects';
import styles from "./projectPage.module.scss";
import ProjectsList from "@/components/projectsList/projectsList.component";
import Back from "@/components/backLink/backLink.component";
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Projects | STron",
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