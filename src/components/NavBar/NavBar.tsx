import React from "react";
import logo from '/assets/logo-no-animation.png';
import { Github, Linkedin } from 'lucide-react';
import { useLocation, useNavigate } from "react-router";



const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <div className="h-full w-full flex justify-center items-center">
            <div className="h-full w-2/3 flex gap-2">
                {/* main logo */}
                <div className="relative h-full w-1/4 flex justify-center items-center py-1 px-2">
                    <div className="h-2/3 aspect-square">
                        <img src={logo} alt="logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-full w-auto flex items-center justify-center text-white text-xl font-medium"> ZQPAPERPIANO </div>
                    <div 
                    onClick={() => navigate('/')}
                    className="absolute h-full w-full main-bg opacity-30 hover:cursor-pointer hover:opacity-0"></div>
                    
                </div>

                {/* main part of navbar */}
                <div className="h-full w-1/2 flex items-center justify-center gap-4 font-medium">
                    <div className={`hover:cursor-pointer ${location.pathname === '/' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/')}>HOME</div>
                    <div className={`hover:cursor-pointer ${location.pathname === '/skills' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/skills')}>SKILLS</div>
                    <div className={`hover:cursor-pointer ${location.pathname === '/projects' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/projects')}>PROJECTS</div>
                    <div className={`hover:cursor-pointer ${location.pathname === '/ziqing' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/ziqing')}>ZIQING</div>
                </div>

                <div className="h-full w-1/4 flex items-center justify-center gap-2">
                <a href="https://github.com/zqpaperpiano"><Github 
                    size={20} className="text-[#8a9198] hover:cursor-pointer hover:text-white" strokeWidth={1.25} /></a>
                    
                <a href="https://www.linkedin.com/in/zi-qing-ong-920449233/"><Linkedin 
                    size={20} className="text-[#8a9198] hover:cursor-pointer hover:text-white" strokeWidth={1.25} /></a>
                </div>
            
            </div>

        </div>
    )
}

export default NavBar;