import React from 'react';
import './SkillTags.css';

interface SkillTagsProps {
    skills: string;
    baseColor?: string;
    textColor?: string;
    hoverColor?: string;
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills, baseColor, textColor }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return(
        <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{backgroundColor: isHovered ? '#65b4de':  (baseColor || '#363e45'), color: isHovered? '#f1f9f8' : (textColor || 'white')}}
        className="h-fit w-fit p-1 bg-opacity-50 whitespace-nowrap rounded-sm  font-[Motiva Sans] hover:cursor-pointer fullShop shadow-3xl">
            <div className="text-xs font-medium">
                {skills}
            </div>
        </div>
    )
}

export default SkillTags;