import React, { useContext, useMemo } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router";
import { ListOfProjects } from "../../data/ListOfProjects";

const Skills:React.FC = () => {
    const {category, skill} = useParams<{category: string, skill: string}>();
    const projectList = useMemo(() => {
        return ListOfProjects.filter(project => project.skills.includes(skill ?? ''))
    }, [skill]);

    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center overflow-y-scroll scroll-bar">

            <div className="w-full flex-1 min-h-1/8 max-h-1/8 main-bg sticky z-50">
                <NavBar />
            </div>

            <div className="w-full flex-1 min-h-7/8 flex font-[Motiva Sans] justify-center relative z-20 p-2"
            style={{
                backgroundImage: `url(/assets/SkillBackgrounds/${category}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            >
                <div className="w-full h-full absolute top-0 bg-[#283848] opacity-90 z-30"></div>
                <div className="w-full h-1/3 flex items-center justify-center text-center text-5xl text-white font-bold uppercase z-40">
                    {skill}
                </div>
                
                
            </div>
        </div>
    )
}

export default Skills;