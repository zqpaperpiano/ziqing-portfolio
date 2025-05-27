import React, { useEffect, useRef, useState } from "react";
import logo from '/assets/logo-no-animation.png';
import { Github, Linkedin } from 'lucide-react';
import { useLocation, useNavigate } from "react-router";



const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [onSkillsBtn, setOnSkillsBtn] = useState<boolean>(false);
    const skillsMenuRef = useRef<HTMLDivElement>(null);
    const skillsBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            const btnRect = skillsBtnRef.current?.getBoundingClientRect();
            const menuRect = skillsMenuRef.current?.getBoundingClientRect();

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

            setOnSkillsBtn(isInNavbar || isInMenu);
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
                    onMouseEnter={() => {setOnSkillsBtn(true)}} onMouseLeave={() => {setOnSkillsBtn(false)}}
                    className={`h-full flex items-center hover:cursor-pointer ${location.pathname === '/skills' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/skills')}>SKILLS</div>
                    <div className={`hover:cursor-pointer ${location.pathname === '/projects' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/projects')}>PROJECTS</div>
                    <div className={`hover:cursor-pointer ${location.pathname === '/ziqing' ? 'selected-txt underline underline-offset-[3px] decoration-[2px] decoration-solid' : 'hover:text-white text-[#d5d7d8]'}`} onClick={() => navigate('/ziqing')}>ZIQING</div>

                    {
                        onSkillsBtn &&
                        <div 
                        ref={skillsMenuRef}
                        className="absolute top-full h-fit z-50 flex gap-8 p-4 bg-gradient-to-b from-[#515f70] to-[#2b3947] shadow-lg">
                            <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                    <div className="text-[#2ebdfc] text-sm uppercase text-shadow-lg">Languages</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">JavaScript</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">TypeScript</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">HTML</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">CSS</div>
                                </div>

                                <div className="flex flex-col text-sm gap-2">
                                    <div className="text-[#2ebdfc] uppercase text-shadow-lg">frameworks</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">React</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">Express.js</div>
                                </div>
                            </div>

                            <div className="flex flex-col text-sm gap-2">
                                <div className="text-[#2ebdfc] uppercase text-shadow-lg">libraries</div>
                                <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">React Router</div>
                                <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">MUI</div>
                                <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">Luicide React</div>
                                <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">Tailwind CSS</div>
                            </div>

                            <div className="flex flex-col gap-4">
                                

                                <div className="flex flex-col text-sm gap-2">
                                    <div className="text-[#2ebdfc] uppercase text-shadow-lg">Databases</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">Firestore</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">MongoDB</div>
                                </div>

                                <div className="flex flex-col text-sm gap-2">
                                    <div className="text-[#2ebdfc] uppercase text-shadow-lg">Authentication</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">Cookies</div>
                                    <div className="text-[#c8c9cb] text-sm hover:cursor-pointer hover:text-white hover:underline hover:underline-offset-4 hover:decoration-2">Firebase Authentication</div>
                                </div>
                            </div>

                            

                            

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