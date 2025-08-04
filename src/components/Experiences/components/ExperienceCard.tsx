import { experienceType } from "../../../types/experienceType";
import SkillTags from "../../SkillTags/SkillTags";

interface ExperienceCardProps {
    experience: experienceType;
    start: boolean;
}

const ExperienceCard = ({ experience, start}: ExperienceCardProps) => {
    return(
        <div className="bg-[#1b2838] text-[#88919a] shadow-xl p-4 h-fit flex flex-col gap-4">
           <div className="w-full flex gap-4">
             <div className="aspect-square h-[28px] p-[2px] bg-[#606060]">
                <img src={experience.companyLogo} alt="pfp" className="h-full w-full object-cover" />
            </div>

            <div className="flex gap-2">
                {
                    start ? (
                        <div>Started my position of </div>
                    ) :  (
                        <div>Ended my time as </div>
                    )
                }
                <div className="text-white">{experience.positionName}</div> 
                at 
                <div className="text-white">{experience.companyName}</div>
            </div>
           </div>

           {
            experience.description && start && (
                <div className="text-[#d7d7d2] text-sm">
                    {experience.description}
                </div>
            )}
            {
                experience.skills && experience.skills.length > 0 && (
                    <div className="flex">
                        {
                            experience.skills.map((skill, index) => (
                                <SkillTags skills={skill} key={index} />
                            ))
                        }
                    </div>
                )
            }


        </div>
    )
}

export default ExperienceCard;