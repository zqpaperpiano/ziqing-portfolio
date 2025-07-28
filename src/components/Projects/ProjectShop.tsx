import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import NavBar from '../NavBar/NavBar';
import { useNavigate, useParams } from 'react-router';
import { ListOfProjects } from '../../data/ListOfProjects';
import './projectShop.css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SkillTags from '../SkillTags/SkillTags';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

interface ContainerWidth {
    left: number;
    right: number;
    width: number;
}

const ProjectShop: React.FC = () => {
    const { id } = useParams();
    const currProject = ListOfProjects[Number(id) - 1];
    const [viewedImage, setViewedImage] = useState<number>(0);
    const [translateX, setTranslateX] = useState<number>(0);
    const noOfImg = currProject.bigStoreImages.length;
    const breadcrumbs = [
        <a href="/projects" className="hover:underline hover:cursor-pointer hover:text-white">Projects</a>,
        <a href={`/projects/${id}`} className="hover:underline hover:cursor-pointer hover:text-white">{currProject.projectName}</a>
    ]
    const galleryWidth = useMemo(() => {
        return Math.max(noOfImg * 116, 600);
    }, [currProject]);
    
    const noOfSets = useMemo(() => {
        return Math.floor(noOfImg / 5);
    }, [currProject]);
    const fullGalleryWidth = useMemo(() => {
        const remainder = noOfImg % 5;
        const fullSetWidth = Math.max(noOfSets - 1, 0) * 116;
        const entireGallery = fullSetWidth + (remainder * 116) + 6;
        
        return entireGallery;
    }, [currProject]);
    const [scrollBarPos, setScrollBarPos] = useState<number>(0);
    const [scrollBarDraggable, setScrollBarDraggable] = useState<boolean>(false);
    const [offsetX, setOffsetX] = useState<number>(0);
    const scrollBarContainer = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<ContainerWidth>({
        left: scrollBarContainer.current?.getBoundingClientRect().left || 0,
        right: scrollBarContainer.current?.getBoundingClientRect().right || 0,
        width: scrollBarContainer.current?.getBoundingClientRect().width || 0
    })

    const descContainer = useRef<HTMLDivElement>(null);
    const [descContainerHeight, setDescContainerHeight] = useState<number>(0);
    const [readMore, setReadMore] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(descContainerHeight > 200){
            setReadMore(true);
        }else{
            setReadMore(false);
        }
    }, [descContainerHeight])



    //observer to monitor scroll bar container size changes
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            setContainerWidth({
                left: scrollBarContainer.current?.getBoundingClientRect().left || 0,
                right: scrollBarContainer.current?.getBoundingClientRect().right || 0,
                width: scrollBarContainer.current?.getBoundingClientRect().width || 0
            })
            setDescContainerHeight(descContainer.current?.getBoundingClientRect().height || 0);
        });

        if(scrollBarContainer.current) {
            observer.observe(scrollBarContainer.current);
        };

        if(descContainer.current) {
            observer.observe(descContainer.current);
        }

        return () => observer.disconnect();
    }, [])

    // auto scroll for gallery
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextImg();
        }, 5000)

        return () => clearInterval(intervalId);
    }, [])

//automatically changes translateX value when the viewedImage changes
    useEffect(() => {
        const currIndex = viewedImage;

        if(currIndex === 0){
            setTranslateX(0);
            setScrollBarPos(0);
            return;
        }

        determineTranslateX(currIndex);
    }, [viewedImage])


//function to determine the translateX value for the image gallery
    const determineTranslateX = (index: number) => {
        const setNum = Math.floor(index / 5);
        let translate = -116 * 5 * setNum;
        const scrollBarScrollableDistance = containerWidth.width - 60;
        let newScrollBarPos = (-translate / fullGalleryWidth) * scrollBarScrollableDistance
    

        if(setNum === noOfSets && noOfSets > 0){
            const remainder = noOfImg - noOfSets * 5;
            translate = -116 * 5 * (setNum - 1) - 116 * remainder;
            newScrollBarPos = scrollBarScrollableDistance
        }

        setTranslateX(translate);
        setScrollBarPos(newScrollBarPos);
    }

    //click next image on gallery
    const nextImg = () => {
        if(viewedImage < noOfImg - 1) {
            setViewedImage(viewedImage + 1);
        }else{
            setViewedImage(0);
            setTranslateX(0);
        }
    }

    //click previous image on gallery
    const prevImg = () => {
        //need to minus 1
        if(viewedImage > 0) {
            setViewedImage(viewedImage - 1);
        }else{
            setViewedImage(noOfImg - 1);
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {

            setScrollBarDraggable(true);
            if(e.currentTarget instanceof Element){
                const rect = e.currentTarget?.getBoundingClientRect();
                setOffsetX(e.clientX - rect.left);
            }
        }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!scrollBarDraggable) return;
    
        const maxRight = containerWidth.right - 60; // 60 is the width of the scroll bar
        let newScrollBarPos = scrollBarPos;
    
        if (e.clientX - offsetX > maxRight) {
            newScrollBarPos = maxRight - containerWidth.left;
        } else if (e.clientX - offsetX < containerWidth.left) {
            newScrollBarPos = 0;
        } else {
            newScrollBarPos = e.clientX - offsetX - containerWidth.left;
        }
    
        // Calculate the proportion of the scroll bar's position
        const scrollBarScrollableDistance = containerWidth.width - 60;
        const scrollBarRatio = newScrollBarPos / scrollBarScrollableDistance;
    
        // Translate the gallery proportionally based on the scroll bar's position
        const translate = -scrollBarRatio * fullGalleryWidth;
        
        // Update both scrollBarPos and translateX in real-time
        requestAnimationFrame(() => {
            setScrollBarPos(newScrollBarPos);
            setTranslateX(translate);
        });
    }, [scrollBarDraggable, containerWidth, offsetX, scrollBarPos, galleryWidth]);

    const handleMouseUp = () => {
            setScrollBarDraggable(false);
    }

    //listeners for mouse movement for scroll bar dragging
    useEffect(() => {
        if(scrollBarDraggable){
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }else{
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [scrollBarDraggable]);   



    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center pb-2 overflow-y-scroll scroll-bar bg-gradient-to-r from-[#1b2838] via-[#2c435b] to-[#1b2838]">
            
            <div className="w-full h-1/8 main-bg sticky z-50">
                <NavBar />
            </div>

            <div className="w-[940px] h-7/8 flex flex-col p-2 gap-2 font-[Motiva Sans]">

                {/* text part of page at the top */}
                <div className="flex flex-col py-2">
                    <div className="flex flex-row gap-2 justify-start items-end text-[#828c91] text-xs font-regular">
                        {
                            breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    {crumb}
                                    {index < breadcrumbs.length - 1 && <span> {'>'} </span>}
                                </React.Fragment>
                            ))
                        }
                    </div>
                    <div className="text-white text-3xl font-regular">{currProject.projectName}</div>
                </div>

                
                {/* image and details part of page */}
                <div className="h-[444px] w-full flex relative gap-2">

                    <div className="h-full w-full absolute flex z-0 bg-[#212c37] opacity-60 pointer-events-none z-0">
                    </div>

                    {/* image area */}
                    <div className="h-full w-[616px] flex flex-col gap-1 z-40">
                        {/* big picture */}
                        <div className="w-full h-[337px] object-cover z-40 bg-white select-none">
                            <img src={currProject.bigStoreImages[viewedImage]} draggable="false" className="h-full w-full object-fit" />
                        </div>

                        {/* picture gallery */}
                        <div className="w-full h-[69px] overflow-x-hidden gap-1">
                            <div className={`h-full flex grid gap-1 transition-transform duration-300 ease-in-out`} style={{
                                transform: `translateX(${translateX}px)`,
                                width: `${galleryWidth}px`, gridTemplateColumns: `repeat(${Math.max(noOfImg, 5)}, 1fr)`}}>
                                {
                                    currProject.bigStoreImages.map((image, index) => {
                                        return(
                                            <div key={index} className={`select-none h-full w-[116px] ${viewedImage === index ? 'border-2 border-white' : ''} overflow-hidden`} onClick={() => setViewedImage(index)}>
                                                <img src={image} alt="store-image" draggable="false" className="h-full w-full object-fit" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* scroll bar */}
                        <div className="w-full h-[18px] flex flex-row bg-[#141c25] rounded-xs">
                            <div 
                            onClick={prevImg}
                            className="h-full w-[38px] bg-[#1e2e3d] flex items-center justify-center hover:cursor-pointer hover:bg-[#3a627f] rounded-xs">
                                <ArrowLeftIcon sx={{color: '#3a627f', 
                                '&:hover': {
                                    color: '#ffffff'

                                }}}/>
                            </div>

                            <div ref={scrollBarContainer} className="h-full flex-1 relative">
                                <div 
                                onMouseDown={handleMouseDown}
                                style={{transform: `translateX(${scrollBarPos}px)`}}
                                className={`transition-transform ease-in-out left-0 absolute h-full w-[60px] rounded-xs  hover:cursor-pointer hover:bg-[#3a627f] ${scrollBarDraggable ? 'bg-[#3a627f] duration-5' : 'bg-[#1e2e3d] duration-500'}`}>

                                </div>
                            </div>


                            <div className="h-full w-[38px] bg-[#1e2e3d] rounded-xs flex items-center justify-center hover:cursor-pointer hover:bg-[#3a627f]"
                            onClick={nextImg}>
                                <ArrowRightIcon
                                sx={{
                                    color: '#3a627f', 
                                    '&:hover': {
                                        color: '#ffffff'
                                    }

                                }} />
                            </div>
                        </div>

                    </div>

                    {/* details area */}
                    <div className="h-[432px] flex-1 flex flex-col z-40 gap-2">

                            {/* store image */}
                        <div className="w-full h-[154px]">
                            <img src={currProject.shopImg} alt="small-store-image" className="h-full w-full object-fit" />
                        </div>

                        {/* store snippet */}
                        <div className="w-full flex-1 text-[#bbc9d4] text-sm">
                            <p>{currProject.snippet}</p>
                        </div>

                        {/* release and update dates */}
                        <div className="w-full flex-1 flex text-[#536570] text-xs gap-2">
                            <div className="flex flex-col w-1/3 h-full gap-2 uppercase">
                                <p>Release Date: </p>
                                <p>Last Update: </p>
                            </div>

                            <div className="flex flex-col w-2/3 h-full gap-2 text-[#899398]">
                                <p>{currProject.releaseDate}</p>
                                <p>{currProject.lastUpdate}</p>
                            </div>
                        </div>

                        <div className="w-full flex-1 flex flex-col ">
                            <div className="text-[#536570] text-xs">
                                Skills and libraries used in this project:    
                            </div>
                            <div className="flex gap-1 flex-wrap">
                            {
                                currProject.skills.map((skill, index) => {
                                    return(
                                        <SkillTags skills={skill} baseColor='#263d4d' textColor='#65bad8' key={index} />
                                    )
                                })
                            }
                            </div>
                           
                        </div>
                        
                    </div>

                </div>

                {/* play game button */}
                <div className="w-[940px] h-[65px] bg-[#53626f] mt-2 z-0 py-4 px-8 rounded-sm relative">
                    <div className="text-white text-xl font-medium">Visit {currProject.projectName}</div>

                    <div className="bg-black w-1/2 h-2/3 rounded-xs absolute right-8 flex gap-1 p-1 flex-nowrap">
                        <div className="w-1/3 flex items-center justify-center">
                            <div className="text-[#c5d3de] font-medium text-center text-sm">Free To Play</div>
                        </div>

                        {
                            currProject.productLink &&
                            <div className="flex-1 flex items-center justify-center py-2 rounded-sm bg-gradient-to-r from-[#76af36] to-[#5b8b2b] text-[#d2efad] hover:cursor-pointer hover:from-[#90d542] hover:to-[#6da834] hover:text-white">
                                <a href={currProject.productLink} target="_blank" className="h-full w-full flex items-center justify-center">
                                 <div className=" font-medium text-center text-sm">Play Game</div>
                                </a>
                            </div>

                        }
                        

                        <div className="flex-1 flex flex-nowrap items-center justify-center p-2 rounded-sm bg-gradient-to-r from-[#46a1eb] to-[#2f62cb] text-[#c5e1f6] hover:cursor-pointer hover:text-white hover:from-[#52c0fa] hover:to-[#3f8de1]">
                            <a href={currProject.githubLink} target="_blank" className="h-full w-full flex items-center justify-center">
                                <div className="font-medium text-center text-sm whitespace-nowrap">View Github</div>
                            </a>
                        </div>

                    </div>
                </div>

                {/* more about the project */}
                <div className="w-full flex flex-col mt-12">
                    <div className="w-full flex flex-col gap-1">
                        <div className="text-white uppercase text-sm font-normal">About this project</div>
                        <div className="w-full h-px bg-gradient-to-r from-[#3e6e89] to-[#213241]"></div>
                    </div>
                    

                    <div className="w-full relative ">
                        <div ref={descContainer} className={`w-full text-[#8c939c] text-sm font-regular p-2 ${readMore ? '' : 'h-[200px] overflow-hidden'}`}>
                            {currProject.moreDetails || <p>More details coming soon!</p>} 
                            
                        </div>

                        {
                            !readMore &&
                            <>
                            <div className="bg-black absolute w-full h-[30px] bottom-0 opacity-30">
                            
                            </div>
                            <div className="absolute w-full h-[30px] bottom-0">
                                <div className="h-full w-full relative">
                                    <div 
                                    onClick={() => setReadMore(true)}
                                    className="absolute top-full right-0 flex flex-nowrap w-1/10 uppercase text-[#356598] text-xs z-40  items-center font-medium hover:cursor-pointer hover:text-white">read more
                                    <KeyboardDoubleArrowDownIcon /> 
                                    </div>
                                </div>
                            </div>
                            </>
                        }
                    </div>

                    <div className="w-full h-12"></div>
                    

                    
                </div>


            </div>




        </div>
    )
}

export default ProjectShop;