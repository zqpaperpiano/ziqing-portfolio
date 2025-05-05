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
        lastUpdate: '14 Apr 2025'
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