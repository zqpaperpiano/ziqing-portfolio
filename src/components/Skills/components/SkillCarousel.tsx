import { useNavigate } from "react-router";
import SkillTags from "../../SkillTags/SkillTags";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ProjectDetails } from "../../../types/projectType";
import { useEffect, useState } from "react";
import Paginator from "./Paginator";
import DoneIcon from '@mui/icons-material/Done';

interface SkillCarouselProps {
    project: ProjectDetails[];

}

const SkillCarousel = ({ project }: SkillCarouselProps) => {
    const navigate = useNavigate();
    const projectLength = project.length || 0;
    const [currIndex, setCurrIndex] = useState<number>(0);
    const currProj = project[currIndex]
    const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
    const [countdown, setCountdown] = useState<number>(10); 
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const total_duration = 10_000;
    const tickRate = 100;
    const [progress, setProgress] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(Date.now());

    useEffect(() => {
        if (projectLength <= 1 || !autoAdvance || isHovered) return;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / total_duration) * 100, 100);
            setProgress(pct);

            if (pct >= 100) {
                setProgress(0);
                setStartTime(Date.now());
            }
        }, tickRate); // e.g., tickRate = 100

        return () => clearInterval(interval);
    }, [projectLength, autoAdvance, isHovered, progress]);

    useEffect(() => {
        if(autoAdvance){
            setStartTime(Date.now());
        }else{
            setProgress(0);
            setCountdown(10);
        }
    }, [autoAdvance])

    useEffect(() => {
        setProgress(0);
        setCountdown(10);

        if(autoAdvance){
            setStartTime(Date.now());
        }
    }, [currIndex]);

    useEffect(() => {
    if (projectLength <= 1 || !autoAdvance || isHovered) return;

    const tickInterval = setInterval(() => {
        setCountdown(prev => {
            if (prev === 1) {
                setCurrIndex(prevIndex => (prevIndex + 1) % projectLength);
                return 10; // reset after advance
            }
            return prev - 1;
        });
        
    }, 1000); // tick every second

    return () => clearInterval(tickInterval);
    }, [projectLength, autoAdvance, isHovered]);



    return(
        <div className="h-full w-full flex items-center justify-center">

            {/* left arrow */}
            <div className="h-full w-16 flex items-center justify-center">
                <KeyboardArrowLeftIcon sx={{ fontSize: 108, color: 'white'}} />   
            </div>

            

            <div className="h-full w-6/8 flex-col">
                {/* actual carousel content */}
                <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="h-5/6 w-full bg-[#292d36] flex-col shadow-xl">
                    <div className="h-9/10 w-full flex">
                        {/* image/video content here */}
                        <div 
                        onClick={() => navigate(`/projects/${currProj?.no}`)}
                        className="h-full w-2/3">
                            <img src={currProj?.bigStoreImages[0]} className="h-full w-full object-fit" /> 
                        </div>

                        {/* text description here */}
                        <div className="h-full w-1/3 flex flex-col justify-center z-30">
                            <div className="h-1/2 w-full relative mb-8">
                                <div 
                                onClick={() => navigate(`/projects/${currProj.no}`)}
                                className="h-full w-full absolute right-8 top-4 z-50 shadow-3xl">
                                    <img src={currProj?.shopImg} className="h-full w-full object-fit" />
                                </div> 
                            </div> 

                            <div className="h-1/2 w-full flex gap-2 pl-4 overflow-x-hidden relative">
                                {
                                    currProj?.skills.map((skill, index) => (
                                        <SkillTags skills={skill} key={index} baseColor="#21262f" textColor="#95a6b7"/>
                                    ))
                                }
                                <div className="absolute h-full w-8 bg-gradient-to-r from-[#292d36]/0 to-[#262931]/100 opacity-70 right-0">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-1/10 w-full flex text-[#667078] relative">
                        <div 
                        onClick={() => {setAutoAdvance(!autoAdvance)}}
                        className="h-full w-28 flex items-center justify-center gap-2 text-xs absolute right-0 whitespace-nowrap hover:cursor-pointer hover:text-white group">
                            <div className="h-[16px] aspect-square bg-[#060a0f] flex items-center justify-center">
                            {autoAdvance && (
                                <DoneIcon className="text-[#115289] group-hover:text-[#1a98ff]" />
                            )}
                            </div>
                            <div>Auto Advance</div>
                        </div>
                        {
                            autoAdvance && (
                                    <div className="h-full w-1/2 flex items-center justify-center gap-2 absolute right-32 text-xs whitespace-nowrap">
                                        <div className="h-full w-1/3 flex items-center justify-end">
                                            {
                                                isHovered ? 
                                                <div>Paused while mouse is hovering</div> :
                                                <div className="text-white">Next Project in {countdown} seconds</div>
                                            }
                                        </div>
                                        <div className="w-2/3 h-1 rounded-xs bg-[#1b2024] overflow-hidden">
                                            <div className="rounded-xs h-1 bg-[#9c9ea0] transition-all duration-75" style={{width: `${progress}%`}}></div>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                </div>

                <div className="h-1/6 w-full flex items-center justify-center">
                    <Paginator total={projectLength || 0} curr={currProj.no || 0} setCurrIndex={setCurrIndex} />
                </div>
            </div>


            {/* right arrow */}
            <div className="h-full w-16 flex items-center justify-center">
                <KeyboardArrowRightIcon sx={{ fontSize: 108, color: 'white'}} />
            </div>

        </div>
    )
}

export default SkillCarousel; 