import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ProjectDetails } from '../../../types/projectType';
import SkillTags from '../../SkillTags/SkillTags';
import { motion } from 'framer-motion';

interface PopUpStoreProps {
    project: ProjectDetails;
}

const PopUpStore: React.FC<PopUpStoreProps> = ({ project }) => {
    const detailBlock = useRef<HTMLDivElement>(null);
    const skillBlock = useRef<HTMLDivElement>(null);
    const [shopTop, setShopTop] = useState<number>(0);
    const noOfImg = project.bigStoreImages.length
    const [currIndex, setCurrIndex] = useState<number>(0);
    const [visibleCount, setVisibleCount] = useState(project.skills.length);
    const storeWidth = useMemo(() => {
        return noOfImg * 350;
    }, [project]);

    useEffect(() => {
        setShopTop(210 - 40);
    })
    

    useEffect(() => {
        const container = skillBlock.current;
        if(!container) return;
        

        const children = Array.from(container.children) as HTMLElement[];
        let totalWidth = 0;
        let maxWidth = container.offsetWidth;
        let count = 0;

        for(let i = 0; i < children.length; ++i){
            totalWidth += children[i].offsetWidth + 4;
            if(totalWidth > maxWidth) break;
            count++;
        }

        if(count < project.skills.length){
            count = Math.max(0, count - 1);
        }

        setVisibleCount(count);
    }, [project])    

    useEffect(() => {
        const intervalId = setInterval(() => {
            let next = currIndex + 1;
            if(next > noOfImg - 1) {
                next = 0;
            }
            setCurrIndex(next);
        }, 2000)

        return () => clearInterval(intervalId);

    }, [currIndex, noOfImg]);

    const hiddenCount = project.skills.length - visibleCount;

    return(
        <motion.div 
        className="relative h-full w-full">

                {/* store preview  */}
                <div className='w-full h-[225px] overflow-x-hidden  '>
                    <div className='h-full grid flex transition-transform ease-in-out' 
                    style={{width: `${storeWidth}px`, gridTemplateColumns: `repeat(${noOfImg}, 1fr)`, transform: `translateX(-${currIndex * 400}px   )`}}>
                    {
                        project.bigStoreImages.map((image, index) => {
                            return(
                                <div className="h-full w-[400px]" key={index}>
                                    <img src={image} alt="store-image" className="h-full w-full object-fit" />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

                <div className="h-[80px] aspect-5/2 bg-white z-50 opacity-100 absolute" style={{top: shopTop, left: 0}}>
                    <img src={project.shopImg} alt="small-store-image" className="h-full w-full object-fill" />
                </div>
                
                {/* details */}
                <div ref={detailBlock} className="absolute bottom-0 w-full h-2/5 bg-[#2a3037] opacity-90 backdrop-blur-sm">
                    <div className="h-full w-full px-2 pt-[44px] pb-4 flex flex-col">
                        <div className="text-2xl font-medium text-[#ffffff]">{project.projectName}</div>
                            <div
                            ref={skillBlock} className="w-full h-12 flex gap-1 mt-2">
                            {
                                project.skills.slice(0, visibleCount).map((skill, index) => {
                                    return(
                                        <SkillTags key={index} skills={skill} />
                                    )
                                })
                            }
                            {
                                hiddenCount > 0 && 
                                    <SkillTags skills={`+${hiddenCount}`} />
                            }
                        </div>
                    </div>
                </div>

        </motion.div>
    )
}

export default PopUpStore;