import React, { useEffect, useState } from "react";
import '../../index.css'
import NavBar from "../NavBar/NavBar";
import { ListOfProjects } from "../../data/ListOfProjects";
import SkillTags from "../SkillTags/SkillTags";
import { useNavigate } from "react-router";

const HomePage: React.FC = () => {
    const recommendedProject = ListOfProjects[0];
    const pictures = recommendedProject.bigStoreImages.slice(0, 4);
    const [currPicIndex, setCurrPicIndex] = useState<number>(0);
    const [currPic, setCurrPic] = useState<string>(recommendedProject.shopImg);
    const [isHover, setIsHover] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!isHover){
            setCurrPic(recommendedProject.shopImg);
        }else{
            setCurrPic(pictures[currPicIndex] || recommendedProject.shopImg);
        }
    }, [isHover])

    useEffect(() => {
        setCurrPic(pictures[currPicIndex]);
    }, [currPicIndex])


    return(
        <div className="h-full w-full relative flex flex-col overflow-y-auto font-[Motiva Sans] text-white">
            
            {/* top half of main page */}
            <div className="w-full h-1/8">
                <NavBar />
            </div>

            {/* bottom half of main page */}
            <div className="w-full h-9/10 bg-gradient-to-b from-[#184151] to-[#1b2939] flex">
                {/* tags and recently visited page */}
                <div className="h-full w-1/5">
                </div>

                {/* main content */}
                <div className="h-full w-3/5 flex flex-col py-2">
                    <div className="h-12 uppercase flex items-center">Featured and recommended</div>
                    <div 
                    onClick={() => navigate(`/projects/${recommendedProject.no}`)}
                    className="h-4/5 w-full bg-gradient-to-r from-[#1b2d40 ] via-[#213d59] to-[#1b2d40] shadow-2xl">
                        <div className="w-full h-9/10 bg-[#0c151f] rounded-xs shadow-3xl flex">
                            <div className="h-full w-2/3 z-40 shadow-3xl">
                                <div className="h-full w-full object-fit">
                                    <img src={currPic} alt="recommended project" className="h-full w-full rounded-tl-xs rounded-bl-xs" />
                                </div>
                            </div>

                            <div className="h-full w-1/3 flex flex-col z-30">
                                <div className="h-18 w-full flex pt-4 px-2 text-2xl ">
                                    {recommendedProject.projectName}
                                </div>

                                <div 
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                className="h-1/2 w-full grid grid-cols-2 grid-rows-2 gap-2 relative pr-2">
                                    {
                                        pictures.map((picture, index) => (
                                            <div 
                                            onMouseEnter={() => {
                                                setCurrPicIndex(index)}}
                                            key={index} className="w-full h-full relative cursor-pointer">
                                                <div className="absolute w-full h-full bg-black opacity-60 z-30  hover:opacity-0"></div>
                                                <img src={picture} alt={`project image ${index}`} className="z-20 h-full w-full object-fit" />
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="flex-1 w-full flex flex-col">
                                    <div className="text-xl px-2 py-2">Now Available</div>
                                </div>

                            </div>
                        </div>
                    </div>
{/* 
                    <div className="w-full h-1/3 flex">
                        <div className="h-12 uppercase flex items-center font-regular">Browse</div>
                    </div> */}
                </div>
                
            </div>

        </div>

    )
}

export default HomePage;