import React from "react";
import logo from '../../assets/logo-no-animation.png'
import { Github, Linkedin } from 'lucide-react';



const NavBar: React.FC = () => {


    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-full w-2/3 flex gap-2">
                {/* main logo */}
                <div className="relative h-full w-1/4 flex justify-center items-center py-1 px-2">
                    <div className="h-2/3 aspect-square">
                        <img src={logo} alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-full w-auto flex items-center justify-center text-white text-xl"> ZQPAPERPIANO </div>
                    <div className="absolute h-full w-full main-bg opacity-30 hover:cursor-pointer hover:opacity-0"></div>
                    
                </div>

                {/* main part of navbar */}
                <div className="h-full w-1/2 flex items-center justify-center gap-4 text-[#d5d7d8]">
                    <div>HOME</div>
                    <div>SKILLS</div>
                    <div>PROJECTS</div>
                    <div>ZIQING</div>
                </div>

                <div className="h-full w-1/4 flex items-center justify-center gap-2">
                    <Github size={20} className="text-[#8a9198] hover:cursor-pointer hover:text-white" strokeWidth={1.25} />
                    <Linkedin size={20} className="text-[#8a9198] hover:cursor-pointer hover:text-white" strokeWidth={1.25} />
                </div>
            
            </div>

        </div>
    )
}

export default NavBar;