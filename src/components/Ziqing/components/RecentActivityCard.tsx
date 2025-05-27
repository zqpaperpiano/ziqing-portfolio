import React, { useEffect, useState } from "react";
import { repoListType } from "../../../types/repoListType";
import { ListOfProjects } from "../../../data/ListOfProjects";

const RecentActivityCard: React.FC<{ activity: repoListType }> = ({ activity }) => {
    const lastUpdatedDate = new Date(activity.lastUpdated).toDateString().split(' ');
    const presentedDate = `${lastUpdatedDate[2]} ${lastUpdatedDate[1]} ${lastUpdatedDate[3]}`;

    const [inShop, setInShop] = useState<boolean>(false);
    const [shopName, setShopName] = useState<string>();
    const [shopPic, setShopPic] = useState<string>('');

    useEffect(() => {
        ListOfProjects.forEach((project) => {
            if(project.repoName === activity.name){
                setInShop(true);
                setShopName(project.projectName);
                setShopPic(project.shopImg);
            }
        })
    }, [])

    return (
        <div className="w-full px-2 py-1">
            <div className="min-h-[90px] bg-[#0c0f12] p-2 text-white rounded-xs shadow-lg flex h-[69px] ">
                <div className="flex-1 h-fit w-2/3 flex gap-4">
                    <div className="w-[184px] h-[69px]">
                        {inShop ? (
                            <img src={shopPic} className="h-full w-full object-cover" />
                        ) : 
                        <div className="h-full w-full flex items-center justify-center font-medium bg-black text-white text-sm">
                            {inShop ? shopName : activity.name}
                        </div>
                        }
                    </div>
                    <div className="flex items-start hover:cursor-pointer hover:text-[#63baec]">
                        <a href={activity.html_url} target="_blank">{inShop ? shopName : activity.name}</a>
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
