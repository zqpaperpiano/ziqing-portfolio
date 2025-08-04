export type ProjectDetails = {
    no: number;
    shopImg: string;
    repoName: string;
    projectName: string;
    bigStoreImages: string[];
    skills: string[];
    snippet: string;
    releaseDate: string;
    lastUpdate: string;
    moreDetails?: React.ReactNode;
    githubLink: string;
    productLink?: string;
}
