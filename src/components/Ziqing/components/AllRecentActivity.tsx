import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../NavBar/NavBar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router";
import { repoListType } from "../../../types/repoListType";
import { RepoContext } from "../../../contexts/repoContext";
import RecentActivityCard from "./RecentActivityCard";

const AllRecentActivity: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('recently-active');
    const repoList = useContext(RepoContext);
    const [recentRepo, setRecentRepo] = useState<repoListType[]>([]);


    useEffect(() => {
        const today = new Date().getTime();
        const filteredRepoList = repoList.filter((repo) => {
            const lastUpdated = new Date(repo.lastUpdated).getTime();
            const diff = Math.abs(today - lastUpdated);
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

            return diffDays <= 90; // Filter for repos updated in the last 30 days
        })
        setRecentRepo(filteredRepoList);
        
    }, [repoList])


    return(
        <div className="w-screen h-screen bg-[#1b2838] flex flex-col items-center justify-center overflow-y-auto scroll-bar">

            <div className="w-full h-1/8 main-bg sticky">
                <NavBar />
            </div>

            <div className="w-full h-7/8 flex flex-col bg-[#1b2838] items-center font-[Motiva Sans]">

            {/* header where the profile name and picture is shown */}
                <div className="w-[978px] h-[102px] bg-[#2a3340] py-4 px-8 flex gap-8 items-center">
                    <div className="w-[66px] h-[66px]">
                        <img src="/assets/steam-pfp.png" alt="Steam Profile" className="w-full h-full object-cover" />
                    </div>

                    <div className="h-full flex items-center gap-2">
                        <div className="h-fit flex items-baseline gap-2">
                            <div 
                            onClick={() => navigate('/ziqing')}
                            className="text-white text-3xl font-regular hover:cursor-pointer hover:text-[#63baec]">Ziqing</div>
                            <div className="flex flex-end items-baseline text-white text-sm gap-1"><KeyboardDoubleArrowRightIcon fontSize="small" className="text-[#68747b]" />
                                <div 
                                onClick={() => navigate('/ziqing/projects/recently-active')}
                                className="hover:cursor-pointer hover:text-[#63baec]">Projects</div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="w-[941px] h-[40px] flex flex-col mt-8 mb-2">
                    <div className="w-full h-[35px] flex items-end gap-1">
                        <div 
                        onClick={() => setActiveTab('recently-active')}
                        className={`rounded-xs p-4 flex items-center text-white ${activeTab === 'recently-active' ? 'bg-[#4888ac] h-[36px]' : ' bg-[#101822] h-[25px] hover:bg-[#396584]'} hover:cursor-pointer `}>
                            Recently Active</div>

                        <div 
                        onClick={() => setActiveTab('all-projects')}
                        className={`rounded-xs p-4 flex items-center text-white ${activeTab === 'all-projects' ? 'bg-[#4888ac] h-[36px]' : ' bg-[#101822] h-[25px] hover:bg-[#396584]'} hover:cursor-pointer `}>
                            All Projects</div>

                    </div>

                    <div className="h-[5px] w-full bg-[#417b9c]"></div>
                </div>

                <div className="w-[941px] flex flex-col">
                        {
                        activeTab === 'recently-active' ? (
                            recentRepo.length > 0 ? (
                                recentRepo.map((repo, index) => {
                                    return(
                                        <RecentActivityCard key={index} activity={repo} picHeight={121} picWidth={259}/>
                                    )
                                })
                            ) : (
                                <div>There has been no active repositories in the past 90 days :( </div>
                            )
                        ) : (
                            repoList.length > 0 ? (
                                repoList.map((repo, index) => {
                                    return(
                                        <RecentActivityCard key={index} activity={repo} picHeight={121} picWidth={259} />
                                    )
                                })
                            ) : (
                                <div>There was an error in retrieving the repositories. Please try again later.</div>
                            )
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default AllRecentActivity;