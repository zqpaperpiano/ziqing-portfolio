import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ProjectDetails } from '../../../types/projectType';
import SkillTags from '../../SkillTags/SkillTags';

interface PopUpStoreProps {
    project: ProjectDetails;
}

const PopUpStore: React.FC<PopUpStoreProps> = ({ project }) => {
    const detailBlock = useRef<HTMLDivElement>(null);
    const [shopTop, setShopTop] = useState<number>(0);
    const popupBlock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setShopTop(210 - 40);
    })
    

    const noOfImg = project.bigStoreImages.length
    const [currIndex, setCurrIndex] = useState<number>(0);
    const storeWidth = useMemo(() => {
        return noOfImg * 350;
    }, [project]);

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

    return(
        <div ref={popupBlock} className="relative h-full w-full">

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
                        <div className="w-full h-fit flex gap-1">
                        {
                            project.skills.map((skill, index) => {


                                return(
                                    <SkillTags key={index} skills={skill}/>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default PopUpStore;