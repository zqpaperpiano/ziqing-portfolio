import React, { useEffect, useState } from "react";
import { repoListType } from "../../../types/repoListType";
import { ListOfProjects } from "../../../data/ListOfProjects";
import { useNavigate } from "react-router";

const RecentActivityCard: React.FC<{ activity: repoListType, picHeight?:number, picWidth?:number }> = ({ activity, picHeight, picWidth }) => {
    const lastUpdatedDate = new Date(activity.lastUpdated).toDateString().split(' ');
    const presentedDate = `${lastUpdatedDate[2]} ${lastUpdatedDate[1]} ${lastUpdatedDate[3]}`;

    const [inShop, setInShop] = useState<boolean>(false);
    const [shopName, setShopName] = useState<string>();
    const [shopPic, setShopPic] = useState<string>('');
    const [repoIdx, setRepoIdx] = useState<number>(0);
    const navigate = useNavigate();

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
                        <div className="h-full w-full flex flex-col items-center justify-center font-medium bg-black text-white text-sm">
                            <div>No image available</div>
                            <div>Not in shop</div>
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
