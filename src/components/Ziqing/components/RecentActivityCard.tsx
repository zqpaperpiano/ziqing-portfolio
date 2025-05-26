import React from "react";

const RecentActivityCard: React.FC<{ activity: string }> = ({ activity }) => {
    return (
        <div className="w-full h-fit px-2 py-1">
            <div className="bg-[#0c0f12] p-2 text-white shadow-lg flex h-[69px]">
                <div className="h-full w-2/3 flex">
                    <div className="w-[184px] h-[69px]">
                        {/* Placeholder for an image or icon */}
                    </div>
                    <div className="flex items-center">{activity}</div>
                </div>

                <div className="h-full w-1/3 flex flex-col justify-end items-end text-[#8c8c8d] text-sm font-regular">
                    <div>Some commits</div>
                    <div>last committed on 25 May 2025</div>
                </div>
            </div>
        </div>
    );
};

export default RecentActivityCard;
