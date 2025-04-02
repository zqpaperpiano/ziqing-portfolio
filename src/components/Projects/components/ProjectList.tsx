import React from 'react';

export interface ProjectListProps{
    no: number;
    shopImg: string;
    projectName: string;
}

const ProjectList: React.FC<ProjectListProps> = ({no, shopImg, projectName}) => {

    console.log('for ', projectName, ' my source is: ', shopImg);

    return(
        <div className="h-full w-full flex bg-[#2a3037] py-2 font-[Motiva Sans] text-[#d7d7d2] gap-2 hover:cursor-pointer hover:bg-[#676b74]">
            <div className="h-full w-1/20 font-bold text-xl flex justify-center items-center">
                {no}
            </div>
            <div className="h-[64px] aspect-5/2 bg-white">
                <img src={shopImg} alt="small-store-image" className="h-full w-full object-fill" />
            </div>
            <div className="h-full w-full flex items-center font-medium text-xl"> {projectName} </div>
        </div>
    )
}

export default ProjectList;