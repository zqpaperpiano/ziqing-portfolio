import React, { useMemo } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router";
import { ListOfProjects } from "../../data/ListOfProjects";
import SkillCarousel from "./components/SkillCarousel";
import ProjectList from "../Projects/components/ProjectList";
import FullSkillCarousel from "./components/FullSkillCarousel";

const Skills:React.FC = () => {
    const {category, skill} = useParams<{category: string, skill: string}>();
    const projectList = useMemo(() => {
        return ListOfProjects.filter(project =>
            project.skills.some(s => s.toLowerCase() === (skill ?? '').toLowerCase())
        );
    }, [skill]);

    return (
    <div className="w-screen h-screen overflow-y-scroll scroll-bar scroll-smooth">
        
        {/* Page 1: Header + Carousel */}
        <section className="h-screen w-full flex flex-col relative font-[Motiva Sans]">
        {/* Sticky Navbar */}
        <div className="w-full h-[12vh] main-bg sticky top-0 z-50">
            <NavBar />
        </div>

        {/* Carousel Section */}
        <div
            className="flex-1 relative flex items-center justify-center"
            style={{
            backgroundImage: `url(/assets/SkillBackgrounds/${category}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full section-bg opacity-90 z-10" />

            {/* Carousel Content */}
            <div className="w-7/8 h-full flex flex-col items-center justify-center gap-4 z-20">
            <div className="w-full text-center text-5xl text-white font-bold uppercase">
                {skill}
            </div>
            <div className="w-full h-full">
                <FullSkillCarousel project={projectList} onSkills={true}/>
            </div>
            </div>
        </div>
        </section>

        {/* Page 2: Project List */}
        <section className="h-screen w-full flex items-center justify-center section-bg">
        <div className="h-full w-1/2 flex flex-col py-4 gap-4 overflow-y-auto">
            <div className="text-2xl font-regular text-white">View All Projects</div>
            <div className="flex flex-col gap-1">
            {projectList.map((project, index) => (
                <ProjectList key={index} project={project} />
            ))}
            </div>
        </div>
        </section>
    </div>
    );
}

export default Skills;