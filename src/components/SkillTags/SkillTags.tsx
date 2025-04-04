import React from 'react';

interface SkillTagsProps {
    skills: string;
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
    return(
        <div className="h-fit w-fit p-1 bg-[#5e7484] bg-opacity-20 whitespace-nowrap rounded-sm text-white font-[Motiva Sans]">
            <div className="text-xs font-medium">
                {skills}
            </div>
        </div>
    )
}

export default SkillTags;