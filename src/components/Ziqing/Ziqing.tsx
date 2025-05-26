import React, { useEffect, useRef } from "react"
import NavBar from "../NavBar/NavBar";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AnimatePresence, motion } from "framer-motion";
import RecentActivityCard from "./components/RecentActivityCard";

const Ziqing: React.FC = () => {
    const [moreNames, setMoreNames] = React.useState<boolean>(false);
    const moreNamesRef = useRef<HTMLDivElement>(null);
    const downArrowRef = useRef<HTMLDivElement>(null);

    const toggleMoreNames = () => {
        if(!moreNames){
            setMoreNames(true);
        }else{
            setMoreNames(false);
        }
    }

    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            if(moreNamesRef.current && !moreNamesRef.current.contains(event.target as Node) && downArrowRef.current && !downArrowRef.current.contains(event.target as Node)){
                toggleMoreNames();
            }
        }

        document.addEventListener('mousedown', clickOutsideHandler);
        return () => {
            document.removeEventListener('mousedown', clickOutsideHandler);
        }
    })


    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center overflow-y-auto scroll-bar">

            <div className="w-full h-1/8 main-bg sticky">
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
                <div className="h-full w-4/6  flex flex-col relative ">
                    <div className="absolute h-full w-full bg-[#24212d] opacity-80 z-0"></div>

                    {/* header portion (name and pfp) */}
                    <div className="w-full h-2/5 flex z-50">
                        {/* name & pfp */}
                        <div className="h-full w-2/3 flex p-8 gap-8">
                            <div className="aspect-square h-full border border-[#4e98b5] border-4">
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

                            <div className="flex gap-2 text-lg">
                                <button className="bg-[#2b3444] rounded-sm shadow-xl px-2 py-1 hover:bg-[#353e4e]">Message</button>
                                <button className="bg-[#2b3444] rounded-sm shadow-xl px-2 py-1 flex items-center justify-center hover:bg-[#353e4e]">More...<ArrowDropDownIcon fontSize="small" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-3/5 z-50 px-4 pb-2">
                        <div className="w-full flex flex-col gap-2 bg-[#192429] min-h-full  ">
                            {/* recent activitiy header */}
                            <div className="w-full h-12 bg-gradient-to-r from-[#30484e] to-[#2a2c41] flex items-center p-2 text-white font-regular text-lg">Recent Activity</div>

                            <RecentActivityCard activity="testing 123" />
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Ziqing;