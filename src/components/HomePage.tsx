import React from "react";
import '../index.css'
import NavBar from "./NavBar/NavBar";

const HomePage: React.FC = () => {
    return(
        <div className="h-full w-full relative flex flex-col">
            
            {/* top half of main page */}
            <div className="w-full h-1/8">
                <NavBar />
            </div>

            {/* bottom half of main page */}
            <div className="w-full h-9/10 section-bg">
                
            </div>

        </div>

    )
}

export default HomePage;