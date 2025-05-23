import { ProjectDetails } from "../types/projectType"

export const ListOfProjects: ProjectDetails[] = [
    {
        no: 1,
        shopImg: '/assets/planner-store-small-image.png',
        projectName: 'Cozy Planner',
        bigStoreImages: [
            '/assets/planner-big-store-1.png',
            '/assets/planner-big-store-2.png',
            '/assets/planner-big-store-3.png',
            '/assets/planner-big-store-4.png',
            '/assets/planner-big-store-5.png',
            '/assets/planner-big-store-6.png',
            '/assets/planner-big-store-7.png',
        ],
        skills: [
            'Javascript',
            'HTML',
            'CSS',
            'Tailwind CSS',
            'React',
            'Firestore',
            'Firebase',
            'Express.js',
            'React Router',
            'MUI',
            'Luicide React'
        ],
        snippet: 'This is a planner that takes on an adventurering theme to help track big goals and break them into smaller and doable tasks.',
        releaseDate: '29 Mar 2025',
        lastUpdate: '14 Apr 2025',
        moreDetails: (
            <>
            <h1 className="text-white text-sm font-medium py-1">Overview</h1>
            <p>I built this planner to help me track large tasks and goals that felt overwhelming to break down in one sitting. Instead of forcing a rigid structure, the planner allows me to track progress through flexible checkpoints, making it easier to stay on top of long-term objectives.
            To make the process more engaging, I themed it after fantasy adventuring, turning goal-setting into a more motivating experience. Additionally, I included a mood tracker to reflect on my progress holistically—categorizing days as good, bad, or unmotivated—helping me identify patterns in productivity and motivation over time.</p>

            <h1 className="text-white text-sm font-medium py-1 mt-2">Tech Stack</h1>
            <li>Front-end; React, Tailwind CSS, Framer motion, React Router, MUI </li>
            <li>Authentication: Firebase </li>
            <li><a href="https://github.com/zqpaperpiano/zq-planner-backend">Backend: </a> Express.js</li>
            <li>Database: Firestore</li>

            <h1 className="text-white text-sm font-medium py-1 mt-2">Features</h1>
            <li>User Authentication</li>
            <li>Dynamic Routing with React Router</li>
            <li>API Integration with Firebase</li>

            <h1 className="text-white text-sm font-medium py-1 mt-2">Future Improvements</h1>
            <li>Adding financial tracking</li>
            <li>Increased gamified components</li>
            <li>Connecting to Google Calendar</li>
            </>
        )
    
    },
    {
        no: 2,
        shopImg: '/assets/tix-store-small.png',
        projectName: 'Tix',
        bigStoreImages: [
            '/assets/tix-big-store-1.png',
            '/assets/tix-big-store-2.png',
            '/assets/tix-big-store-3.png',
        ],
        skills: [
            'React',
            'HTML',
            'CSS',
            'Figma',
            'Bootstrap'
        ],
        snippet: 'This is a ticketing website that allows users to book tickets for movies and events. I was mainly focused on the front end aspect of this project',
        releaseDate: '15 Sep 2023',
        lastUpdate: '15 Sep 2023'
    }
]