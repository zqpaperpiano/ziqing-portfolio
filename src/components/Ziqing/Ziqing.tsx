import React, { useContext, useEffect, useRef } from "react"
import NavBar from "../NavBar/NavBar";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AnimatePresence, motion } from "framer-motion";
import RecentActivityCard from "./components/RecentActivityCard";
import { repoListType } from "../../types/repoListType";
import { useNavigate } from "react-router";
import { RepoContext } from "../../contexts/repoContext";

const Ziqing: React.FC = () => {
    const [moreNames, setMoreNames] = React.useState<boolean>(false);
    const moreNamesRef = useRef<HTMLDivElement>(null);
    const downArrowRef = useRef<SVGSVGElement>(null);
    const moreOptionsRef = useRef<HTMLDivElement>(null);
    const moreOptionButtonRef = useRef<HTMLButtonElement>(null);
    const [moreOptions, setMoreOptions] = React.useState<boolean>(false);

    const recipientEmail='ong.zi.qing.02@gmail.com';
    const subject='Sending a Friend Request';
    const message="Hi Ziqing, I viewed your portfolio and would like to reach out to you!";

    const encodedSubject = encodeURIComponent(subject);
    const encodedMessage = encodeURIComponent(message);
    const mailtoLink=`mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedMessage}`;

    const toggleMoreoOptions = () => {
        setMoreOptions(!moreOptions);
    }

    const toggleMoreNames = () => {
        if(!moreNames){
            setMoreNames(true);
        }else{
            setMoreNames(false);
        }
    }

    const  repoList  = useContext(RepoContext);
    const [showedActivity, setShowedActivity] = React.useState<repoListType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(repoList.length > 0){
            setShowedActivity(repoList.slice(0, 3));
        }
    }, [repoList])

    // checking if user clicks outside of the more options boxes
    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            if(moreNamesRef.current && !moreNamesRef.current.contains(event.target as Node) && downArrowRef.current && !downArrowRef.current.contains(event.target as Node)){
                toggleMoreNames();
            }else if(moreOptionsRef.current && !moreOptionsRef.current.contains(event.target as Node) && moreOptionButtonRef.current && !moreOptionButtonRef.current.contains(event.target as Node)){
                toggleMoreoOptions();
            }
        }

        document.addEventListener('mousedown', clickOutsideHandler);
        return () => {
            document.removeEventListener('mousedown', clickOutsideHandler);
        }
    })


    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center overflow-y-auto scroll-bar">

            <div className="w-full h-1/8 main-bg sticky z-50">
                <NavBar />
            </div>

            <div
                className="h-7/8 w-full bg-[#283848] flex flex-col font-[Motiva Sans] items-center"
                style={{
                    backgroundImage: `url(/assets/profile_background.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="h-full w-[976px]  flex flex-col relative ">
                    <div className="absolute h-full w-full bg-[#24212d] opacity-80 z-0"></div>

                    {/* header portion (name and pfp) */}
                    <div className="w-full h-[224px] flex z-40">
                        {/* name & pfp */}
                        <div className="h-full w-2/3 flex p-8 gap-8">
                            <div className="aspect-square h-[164px] border border-[#4e98b5] border-4">
                                <img src="/assets/steam-pfp.png" alt="pfp" className="h-full w-full object-cover" />
                            </div>

                            <div className="text-white font-regular text-2xl">
                                Ziqing
                                <span className="relative inline-block">
                                    <ArrowDropDownIcon ref={downArrowRef} onClick={toggleMoreNames} className="text-white text-2xl hover:cursor-pointer relative" />
                                    <AnimatePresence>
                                            {
                                                moreNames &&
                                                <motion.div 
                                                key="more-names"
                                                initial= {{opacity: 0}}
                                                animate={{ opacity: 1}}
                                                exit={{opacity: 0}}
                                                transition={{duration: 0.5, ease: "easeInOut"}}
                                                ref={moreNamesRef} className="absolute left-0 top-full mt-1 bg-[#3d4450] h-fit w-fit flex flex-col text-xs font-regular p-2 shadow-2xl z-50 gap-2">
                                                    <div className="whitespace-nowrap">This user has also played as: </div>
                                                    <div>Zzqq</div>
                                                    <div>Zqpaperpiano</div>
                                                </motion.div>
                                            }
                                    </AnimatePresence>
                                </span>
                            </div>
                        </div>

                        <div className="h-full w-1/3 flex flex-col text-white font-regular text-xl p-8 gap-4">
                            <div className="flex gap-2">Level 
                                <div className="rounded-full border border-white border-1 w-[32px] h-[32px] p-2 flex items-center justify-center">8</div>
                            </div>

                            <div className="flex gap-2 text-lg relative">
                                <button className="bg-[#2b3444] rounded-xs shadow-xl px-2 py-1 hover:bg-[#353e4e]"><a href={mailtoLink}>Message</a></button>
                                <button 
                                ref={moreOptionButtonRef}
                                onClick={toggleMoreoOptions}
                                className="bg-[#2b3444] rounded-xs shadow-xl px-2 py-1 flex items-center justify-center hover:bg-[#353e4e]">More...<ArrowDropDownIcon fontSize="small" /></button>
                                <AnimatePresence>
                                    {
                                        moreOptions && 
                                        <motion.div 
                                        ref={moreOptionsRef}
                                        key="more-options"
                                        initial= {{opacity: 0}}
                                        animate={{ opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.5, ease: "easeInOut"}}
                                        className="absolute top-full left-0 w-fit h-fit bg-[#171a21] shadow-xl flex flex-col text-xs font-medium">
                                            <div className="hover:cursor-pointer hover:bg-[white] hover:text-black p-2"><a href="https://www.linkedin.com/in/zi-qing-ong-920449233/" target="_blank">View LinkedIn</a></div>
                                            <div className="hover:cursor-pointer hover:bg-[white] hover:text-black p-2"><a href="https://github.com/zqpaperpiano" target="_blank">View GitHub</a></div>
                                            <div className="hover:cursor-pointer hover:bg-[white] hover:text-black p-2"><a href="https://steamcommunity.com/profiles/76561198310634481/" target="_blank">View Actual Steam Profile</a></div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex-1 z-40 px-4 pb-2">
                        <div className="w-full flex-col gap-2 bg-[#192429]">

                            {/* recent activitiy header */}
                            <div className="w-full h-12 bg-gradient-to-r from-[#30484e] to-[#2a2c41] flex items-center p-2 text-white font-regular text-lg">Recent Activity</div>
                            {
                                showedActivity.length > 0 &&
                                showedActivity.map((repo, index) => {
                                    return(
                                        <RecentActivityCard key={index} activity={repo} picHeight={69} picWidth={184}/>
                                    )
                                })
                            }

                            <div className="flex-1 w-full flex items-end justify-end p-2 flex gap-2">
                                <button 
                                onClick={() => {navigate('/ziqing/projects/recently-active')}}
                                className="text-white font-regular hover:text-[#63baec] text-sm"> View All Activity</button>
                            </div>
                            
                        </div>



                    </div>
                </div>

            </div>

        </div>
    )
}

export default Ziqing;