import React, { useEffect, useMemo, useState } from "react";
import { repoListType } from "../../../types/repoListType";
import { ListOfProjects } from "../../../data/ListOfProjects";
import { useNavigate } from "react-router";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";

const RecentActivityCard: React.FC<{ activity: repoListType, picHeight?:number, picWidth?:number }> = ({ activity, picHeight, picWidth }) => {
    const lastUpdatedDate = new Date(activity.lastUpdated).toDateString().split(' ');
    const presentedDate = `${lastUpdatedDate[2]} ${lastUpdatedDate[1]} ${lastUpdatedDate[3]}`;

    const [inShop, setInShop] = useState<boolean>(false);
    const [shopName, setShopName] = useState<string>();
    const [shopPic, setShopPic] = useState<string>('');
    const [repoIdx, setRepoIdx] = useState<number>(0);
    const navigate = useNavigate();
    const { svgString } = useMemo(() => {

        const getRandomRotation = () => {
                const randomFactor = Math.floor(Math.random() * 37);
                return randomFactor * 10;
            }

        const getRandomColor = () => {
            const r  = Math.floor(Math.random() * 256);
            const g  = Math.floor(Math.random() * 256);
            const b  = Math.floor(Math.random() * 256);

            const hexR = r.toString(16).padStart(2, '0');
            const hexG = g.toString(16).padStart(2, '0');
            const hexB = b.toString(16).padStart(2, '0');

            return `${hexR}${hexG}${hexB}`;
        }

        const rotation = getRandomRotation();
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        const color3 = getRandomColor();

        const avatar = createAvatar(shapes, {
            seed: activity.name, // use activity.name for uniqueness
            rotate: rotation,
            backgroundColor: [color1, color2, color3],
            backgroundType: ['gradientLinear']
        });

        return {
            svgString: avatar.toString()
        };
    }, [activity.name]);

    useEffect(() => {
        ListOfProjects.forEach((project) => {
            if(project.repoName === activity.name){
                setInShop(true);
                setShopName(project.projectName);
                setShopPic(project.shopImg);
                setRepoIdx(project.no);
            }
        })
    }, [])

    return (
        <div className="w-full px-2 py-1">
            <div className="flex-1 bg-[#16202d] py-2 px-4 text-white rounded-xs shadow-lg flex ">
                <div className="flex-1 h-fit w-2/3 flex gap-4">
                    <div style={{height: `${picHeight ? `${picHeight}px` : '69px'}`, width: `${picWidth ? `${picWidth}px` : '184px'}`}} className="relative">
                        {inShop ? (
                            <img src={shopPic} className="h-full w-full object-cover" />
                        ) : 
                        <div className="h-full w-full flex flex-col items-center justify-center font-medium bg-black text-white text-sm overflow-hidden">
                            <div dangerouslySetInnerHTML={{__html: svgString}} className="h-full w-full object-fit"/>
                        </div>
                        }
                    </div>
                    <div 
                    onClick={() => {
                        if(inShop){
                            navigate(`/projects/${repoIdx}`)
                        }else{
                            window.open(activity.html_url, '_blank', 'noopener,noreferrer');
                        }
                    }}
                    className="flex items-start hover:cursor-pointer text-lg hover:text-[#63baec]">
                        {inShop ? shopName : activity.name}
                        </div>
                </div>

                <div className="h-full w-1/3 flex flex-col justify-end items-end text-[#8c8c8d] text-sm font-regular">
                    <div>{activity.numCommits} commits</div>
                    <div>last committed on {presentedDate}</div>
                </div>
            </div>
        </div>
    );
};

export default RecentActivityCard;
