import React, { useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () =>  {
  const xbox = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const [nextLogo, setNextLogo] = React.useState(false);
  const [wordLogoVisible, setWordLogoVisible] = React.useState(false);

  useEffect(() => {
    const xboxElement = xbox.current;
    

    // Xbox logo animation - fades out after 5 seconds
    setTimeout(() => {
      if(xboxElement){
        xboxElement.classList.add('expand-fade');
      }
    }, 5000);

    // Word logo fade-in after the Xbox logo fades out
    setTimeout(() => {
      setWordLogoVisible(true); // Make word logo visible
    }, 6000); // After Xbox logo animation ends

    // Word logo animation & fade-out
    setTimeout(() => {
      const logoElement = logo.current;
      if(logo){
        logoElement?.classList.add('logo-exit');
      }; // Hide the word logo after animation ends
    }, 11000); // After word logo animation ends (including fade-in time)

  }, []);

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center">
        <div ref={xbox} className="absolute xbox" style={{height: '320px', width: '320px'}}>
        </div>
        {
          wordLogoVisible && <div ref={logo} className="absolute logo " style={{height: '320px', width: '320px'}}></div>
        }
    </div>
  );
};

export default App;
