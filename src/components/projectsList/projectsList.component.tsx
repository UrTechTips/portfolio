"use client";
import { useRouter } from "next/navigation";
import { ProjectFrontmatter } from '@/lib/projects';
import { FaExternalLinkAlt } from 'react-icons/fa';
import useCursorAnim from "@/hooks/useCursorAnimations";
import styles from "./projectsList.module.scss";
import { gsapContext } from '@/app/context';
import { useContext } from 'react';

const ProjectsList = ({projects}: {projects: ProjectFrontmatter[]}) => {
    const router = useRouter();
    const cursorRef = useContext(gsapContext).cursorRef;
    const cursorAnims = useCursorAnim(cursorRef);

    const handleProjectClick = (name: string) => {
		cursorAnims.projectMouseLeave();
		router.push(`\\projects\\${name.toLowerCase().replaceAll(" ", "-")}`);
	};
    return (
        <>
        {projects.map((project, index) => {
            return (
                <div key={index} className={styles.project} id="project">
                            <div className={styles.left} onClick={() => handleProjectClick(project.title)} onMouseEnter={() => cursorAnims.projectMouseEnter(project.thumbnail!)} onMouseLeave={() => cursorAnims.projectMouseLeave()}>
                                <h2>
                                    <span>#{index + 1}</span> {project.title}
                                </h2>
                            </div>
                            <div className={styles.right}>
                                {project.mainLink != "DNE" ? (
                                    <a href={project.mainLink} target="_blank" onMouseEnter={() => cursorAnims.linkMouseEnter()} onMouseLeave={() => cursorAnims.linkMouseLeave()}>
                                        Visit <FaExternalLinkAlt />
                                    </a>
                                ) : (
                                    <a>In Progress</a>
                                )}
                            </div>
                        </div>
                    );
                })}
        </>
    )
}

export default ProjectsList;