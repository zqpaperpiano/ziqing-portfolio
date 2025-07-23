import React, { useEffect, useRef, useState } from "react";
import logo from '/assets/logo-no-animation.png';
import { Github, Linkedin } from 'lucide-react';
import { useLocation, useNavigate } from "react-router";
import { ListOfSkills } from "../../data/ListOfSkills";
import { ProfileMenu } from "../../data/ProfileMenu";



const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [onSkillsBtn, setOnSkillsBtn] = useState<boolean>(false);
    const [onProfileBtn, setOnProfileBtn] = useState<boolean>(false);
    const skillsMenuRef = useRef<HTMLDivElement>(null);
    const skillsBtnRef = useRef<HTMLDivElement>(null);
    const profileBtnRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            const btnRect = skillsBtnRef.current?.getBoundingClientRect();
            const menuRect = skillsMenuRef.current?.getBoundingClientRect();
            const profileBtnRect = profileBtnRef.current?.getBoundingClientRect();
            const profileMenuRect = profileMenuRef.current?.getBoundingClientRect();

            const isInNavbar:boolean = !!btnRect && 
            e.clientX >= btnRect.left &&
            e.clientX <= btnRect.right &&
            e.clientY >= btnRect.top &&
            e.clientY <= btnRect.bottom;

            const isInMenu:boolean = !!menuRect &&
            e.clientX >= menuRect.left &&
            e.clientX <= menuRect.right &&
            e.clientY >= menuRect.top &&
            e.clientY <= menuRect.bottom;

            const isInProfileBtn:boolean = !!profileBtnRect &&
            e.clientX >= profileBtnRect.left &&
            e.clientX <= profileBtnRect.right &&
            e.clientY >= profileBtnRect.top &&
            e.clientY <= profileBtnRect.bottom;

            const isInProfileMenu:boolean = !!profileMenuRect &&
            e.clientX >= profileMenuRect.left &&
            e.clientX <= profileMenuRect.right &&
            e.clientY >= profileMenuRect.top &&
            e.clientY <= profileMenuRect.bottom;

            setOnSkillsBtn(isInNavbar || isInMenu);
            setOnProfileBtn(isInProfileBtn || isInProfileMenu);
            }

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);



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
                <div className="h-full w-1/2 flex items-center justify-center gap-4 font-medium relative ">
                    <div className={`hover:cursor-pointer ${location.pathname === '/' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/')}>HOME</div>
                    <div 
                    ref={skillsBtnRef}
                    className={`h-full flex items-center hover:cursor-pointer ${location.pathname === '/skills' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`}>SKILLS</div>
                    <div className={`hover:cursor-pointer ${location.pathname === '/projects' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/projects')}>PROJECTS</div>
                    <div 
                    ref={profileBtnRef}
                    className={`h-full flex items-center hover:cursor-pointer ${location.pathname === '/ziqing' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/ziqing')}>ZIQING
                        <div className="w-full h-full relative bg-white">
                            {
                                onProfileBtn &&
                                <div 
                                ref={profileMenuRef}
                                className="absolute top-full -left-17 gap-4 h-fit z-50 flex flex-col p-4 bg-gradient-to-b from-[#515f70] to-[#2b3947] shadow-lg">
                                    {
                                        Object.entries(ProfileMenu).map(([index, menuObj]) => (
                                            <div key={index} className="flex flex-col gap-2">
                                                <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">{menuObj}</div>
                                            </div>
                                        ))
                                    }    
                                </div>
                            }
                        </div>
                    </div>
                    {
                        onSkillsBtn &&
                        <div 
                        ref={skillsMenuRef}
                        className="absolute top-full h-fit z-50 grid grid-cols-3 grid-rows-2 gap-6 p-4 bg-gradient-to-b from-[#515f70] to-[#2b3947] shadow-lg">
                            {
                                Object.entries(ListOfSkills).map(([category, skills], index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="text-[#2ebdfc] text-sm uppercase text-shadow-lg">{category}</div>
                                        {
                                            skills.map((skill, skillIndex) => (
                                                <div 
                                                key={skillIndex} 
                                                className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">
                                                    {skill}
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }    
                        </div>
                    }
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