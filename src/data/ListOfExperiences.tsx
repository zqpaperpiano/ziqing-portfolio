import { experienceType } from "../types/experienceType";

export const ListOfExperiences: experienceType[] = [
    {
        no: 1, 
        companyName: 'Schneider Electric',
        companyLogo: '/assets/experienceImages/SU.PA.svg',
        positionName: 'Learning Specialist Intern',
        startDate: new Date('2024-06-03'),
        endDate: new Date('2024-12-27'),
        description: `
            Coordinated learning initiatives across East Asia and Japan, aligning execution with regional training needs and business priorities.\n
            Supported the development of a regional learning roadmap through learning needs analysis and structured planning.\n
            Used Excel tools, including Power Query and VBA, to automate and monitor learning campaign performance.\n
            Generated and delivered regular progress reports to HR Business Partners to track employee learning engagement and effectiveness.\n
            Assisted in the design and implementation of scalable learning interventions, ensuring consistency in execution and reporting across multiple markets.
        `

    },
    {
        no: 2,
        companyName: 'Pawkit',
        companyLogo: '/assets/experienceImages/PawkitLogo.svg',
        positionName: 'Business Development & Operations Intern',
        startDate: new Date('2025-06-02'),
        description: `
        Managed non-technical aspects of mobile app development, including coordination between internal teams and external vendors, as well as planning of product-related deliverables.\n
Reviewed wireframes and prototypes to ensure user-centric design, supported QA testing, and facilitated communication through document translation and bilingual meetings.\n
Prepared product-facing materials such as service listings, SOPs, and user guides, and supported onboarding of service providers.\n
Monitored performance metrics using internal dashboards to track user retention and vendor engagement, contributing to post-launch product iterations and improvements.`
    }
]