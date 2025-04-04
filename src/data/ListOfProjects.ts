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
        ]
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
            'Figma'
        ]
    }
]