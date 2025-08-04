import React from "react"
import NavBar from "../NavBar/NavBar"
import ExperienceCard from "./components/ExperienceCard";
import { ListOfExperiences } from "../../data/ListOfExperiences";

const Experiences = () => {
    console.log('list of experiences', ListOfExperiences);

    const getDateMonth = (date: Date) => {
        const dateStr = date.toDateString();
        const partArr = dateStr.split(' ');
        return `${partArr[2]} ${partArr[1]} ${partArr[3]}`;

    }

    return (
        <div className="w-full h-full flex flex-col overflow-auto">

            <div className="w-full flex-1 min-h-1/8 main-bg z-50">
                <NavBar />
            </div>

            <div className="flex-1 w-full bg-[#283848] flex flex-col font-[Motiva Sans] items-center ">
                <div className="w-5/7 h-full ">
                    <div className="w-full h-16 text-[#66c0f4] text-3xl font-regular py-4 flex items-start justify-start">
                        <p>Experiences</p>
                    </div>

                    <div className="flex-1 w-full flex flex-col gap-4 pb-4">
                        {
                        ListOfExperiences.map((experience) => (
                            <React.Fragment key={experience.no}>
                            <div className="flex items-center w-full gap-2">
                                <div className="text-[#4e98b5] whitespace-nowrap">
                                    {getDateMonth(experience.startDate)}
                                </div>
                                <div className="flex-1 h-px bg-[#4e98b5]"></div>
                            </div>
                            <ExperienceCard experience={experience} start={true} />
                            {experience.endDate && (
                                <React.Fragment>
                                    <div className="flex items-center w-full gap-2">
                                        <div className="text-[#4e98b5] whitespace-pre-line">
                                            {getDateMonth(experience.endDate)}
                                        </div>
                                        <div className="flex-1 h-px bg-[#4e98b5]"></div>
                                    </div>
                                    <ExperienceCard experience={experience} start={false} />
                                </React.Fragment>
                            )}
                            </React.Fragment>
                        ))
                    }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Experiences;