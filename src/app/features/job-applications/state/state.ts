export interface JobApplication {
    id: string;
    companyName: string;
    position: string;
    status: Status;
    notes: string;
    isRemote: boolean;
    dateApplied: Date;
}

export interface CreateApplication {
    companyName: string;
    position: string;
    status: Status;
    notes: string;
    isRemote: boolean;
}

export interface UpdateApplication {
    id: string;
    companyName: string;
    position: string;
    status: Status;
    notes: string;
    isRemote: boolean;
}


export enum Status {
    Applied,
    Interviewing,
    OfferReceived,
    Rejected,
    Accepted
}

export interface JobApplicationState {
    jobApplications: JobApplication[];
    selectedApplication: JobApplication | null;
    loading: boolean;
}