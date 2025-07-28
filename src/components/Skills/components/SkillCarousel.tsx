import { useNavigate } from "react-router";
import { ListOfProjects } from "../../../data/ListOfProjects";
import SkillTags from "../../SkillTags/SkillTags";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const SkillCarousel = () => {
    const tempProject = ListOfProjects[0];
    const navigate = useNavigate();

    return(
        <div className="h-full w-full flex items-center justify-center">

            {/* left arrow */}
            <div className="h-full w-12 flex items-center justify-center">
                <KeyboardArrowLeftIcon sx={{ fontSize: 108, color: 'white'}} />   
            </div>

            {/* actual carousel content */}
            <div className="h-full w-6/8 bg-[#292d36] flex shadow-xl">
                {/* image/video content here */}
                <div 
                onClick={() => navigate(`/projects/${tempProject.no}`)}
                className="h-full w-2/3">
                    <img src={tempProject.bigStoreImages[0]} className="h-full w-full object-fit" /> 
                </div>

                {/* text description here */}
                <div className="h-full w-1/3 flex flex-col justify-center z-30">
                    <div className="h-1/2 w-full relative mb-8">
                        <div 
                        onClick={() => navigate(`/projects/${tempProject.no}`)}
                        className="h-full w-full absolute right-8 top-4 z-50 shadow-3xl">
                            <img src={tempProject.shopImg} className="h-full w-full object-fit" />
                        </div> 
                    </div> 

                    <div className="h-1/2 w-full flex gap-2 pl-4 overflow-x-hidden relative">
                        {
                            tempProject.skills.map((skill, index) => (
                                <SkillTags skills={skill} key={index} baseColor="#21262f" textColor="#95a6b7"/>
                            ))
                        }
                        <div className="absolute h-full w-8 bg-gradient-to-r from-[#292d36]/0 to-[#262931]/100 opacity-70 right-0">

                        </div>
                    </div>
                </div>
            </div>

            {/* right arrow */}
            <div className="h-full w-12 flex items-center justify-center">
                <KeyboardArrowRightIcon sx={{ fontSize: 108, color: 'white'}} />
            </div>

        </div>
    )
}

export default SkillCarousel; 