import React from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router";

const Skills:React.FC = () => {
    const {category, skill} = useParams<{category: string, skill: string}>();

    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center pb-2 overflow-y-scroll scroll-bar">

            <div className="w-full h-1/8 main-bg sticky z-50">
                <NavBar />
            </div>

            <div className="w-[940px] h-7/8 flex font-[Motiva Sans] justify-center">
                <div className="w-full h-1/3 text-center font-2xl text-white font-semibold">
                    {skill}
                </div>
            </div>
        </div>
    )
}

export default Skills;