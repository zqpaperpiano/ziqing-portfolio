import { ProjectDetails } from "../../../types/projectType"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SkillCarousel from "./SkillCarousel";

interface FullSkillCarouselProps {
    project: ProjectDetails[];
    onSkills: boolean;
}

const FullSkillCarousel = ({ project, onSkills }: FullSkillCarouselProps) => {
        return(
        <div className="h-full w-full flex items-center justify-center relative">

            {/* left arrow */}
            <div className={`h-full w-16 flex items-center justify-center`}>
                <KeyboardArrowLeftIcon sx={{ fontSize: 108, color: '#fff' }} />
            </div>

            

            <div className={`h-full ${onSkills ? 'w-6/8' : 'w-full'} flex-col`}>
                <SkillCarousel project={project} onSkills={onSkills} />
            </div>


            {/* right arrow */}
            <div className="h-full w-16 flex items-center justify-center">
                <KeyboardArrowRightIcon sx={{ fontSize: 108, color: '#fff'}} />
            </div>

        </div>
    )

}

export default FullSkillCarousel;