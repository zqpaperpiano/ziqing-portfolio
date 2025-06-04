export interface categoryTypes {
    [category: string]: string[];
}

// export const ListOfSkills: skillTypes[] = [
//     {name: 'Javascript', category: 'Language'},
//     {name: 'HTML', category: 'Language'},
//     {name: 'CSS', category: 'Language'},
//     {name: 'React Router', category: 'Libraries'},
//     {name: 'MUI', category: 'Libraries'},
//     {name: 'Luicide React', category: 'Libraries'},
//     {name: 'Tailwind CSS', category: 'Framework'},
//     {name: 'Framer Motion', category: 'Libraries'},
//     {name: 'Express.js', category: 'Framework'},
//     {name: 'Firebase Authentication', category: 'Authentication'},
//     {name: 'Cookies', category: 'Authentication'},
//     {name: 'Firestore', category: 'Database'},
//     {name: 'MongoDB', category: 'Database'},
//     {name: 'Docker', category: 'DevOps'},
//     {name: 'Git', category: 'DevOps'},
//     {name: 'Typescript', category: 'Language'},
//     {name: 'React', category: 'Framework'},
//     {name: 'Node.js', category: 'Framework'},
// ]

export const ListOfSkills: categoryTypes = {
    'Language': ['Javacscript', 'TypeScript', 'HTML', 'CSS'],
    'Framework': ['React', 'Express.js', 'Node.js'],
    'Libraries': ['React Router', 'MUI', 'Luicide React', 'Tailwind CSS', 'Framer Motion'],
    'Database': ['Firestore', 'MongoDB'],
    'DevOps': ['Docker', 'Git'],
    'Auth': ['Cookies', 'Firebase Authentication'],
};