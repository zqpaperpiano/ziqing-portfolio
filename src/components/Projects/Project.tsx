import React from 'react';
import NavBar from '../NavBar/NavBar';
import ProjectList from './components/ProjectList';
import { ListOfProjects } from '../../data/ListOfProjects';

const Project: React.FC = () => {

    return(
        <div className="w-screen h-screen flex flex-col section-bg">
            
            <div className="w-full h-1/8 main-bg">
                <NavBar />
            </div>

            <div className="w-full h-7/8 flex items-center justify-center font-[Motiva Sans] text-[#d7d7d2]">
                <div className="h-full w-1/2 flex flex-col py-4 gap-4">
                    <div className="text-3xl font-medium"> PROJECTS </div>
                    <div className="text-lg font-regular text-[#8a9198]">Individual and group projects done by ziqing :)</div>

                    <div className="h-flex-1 w-full flex flex-col gap-1">
                        {
                            ListOfProjects.map((project, index) => {
                                return(
                                    <ProjectList key={index} no={project.no} shopImg={project.shopImg} projectName={project.projectName} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Project;