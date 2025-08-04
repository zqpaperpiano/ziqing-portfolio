import React, { useEffect, useRef, useState } from 'react';
import PopUpStore from './PopUpStore';
import { ProjectDetails } from '../../../types/projectType';
import { useNavigate } from 'react-router';

interface ProjectListProps {
    project: ProjectDetails;
}

const ProjectList: React.FC<ProjectListProps> = ({ project }) => {
    const blockPost = useRef<HTMLDivElement>(null);
    const imagePos = useRef<HTMLDivElement>(null);
    const [onHover, setOnHover] = useState<boolean>(false);
    const [topPos, setTopPos] = useState<number>(0);
    const [rightPos, setRightPos] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new ResizeObserver(() => { 
            setTopPos(blockPost.current?.getBoundingClientRect().top || 0);
            setRightPos(imagePos.current?.getBoundingClientRect().right || 0);
        });

        if(blockPost.current) {
            observer.observe(blockPost.current);
        };

        if(imagePos.current) {
            observer.observe(imagePos.current);
        };

        return () => observer.disconnect();
    }, [])

    return(
        <div 
        ref={blockPost}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        onClick={() => navigate(`/projects/${project.no}`)}
        className="h-full w-full flex bg-[#2a3037] py-2 font-[Motiva Sans] text-[#d7d7d2] gap-2 hover:cursor-pointer hover:bg-[#676b74]">
            <div className="h-full w-1/20 font-bold text-xl flex justify-center items-center">
                {project.no}
            </div>
            <div ref={imagePos} className="h-[64px] aspect-5/2 bg-white">
                <img src={project.shopImg} alt="small-store-image" className="h-full w-full object-fill" />
            </div>
            <div className="h-full w-full flex items-center font-medium text-xl"> {project.projectName} </div>
            {
                onHover &&
                <div className="absolute h-[350px] w-[400px]" style={{top: topPos, left: rightPos + 50}}>
                    <PopUpStore project={project}/>
                </div>
            }
        </div>
    )
}

export default ProjectList;