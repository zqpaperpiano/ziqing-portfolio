export type experienceType = {
    no: number;
    companyName: string;
    companyLogo: string;
    positionName: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
    skills?: string[];
}