export interface Job {
    jobID: string;
    jobTitle: string;
    description: string;
    jobCreatorID: string;
    jobBudget: string;
    createdAt: string;
    updatedAt: string;
    jobStatus: string;
}

export interface Job_Data {
  data: Job;
}

export interface AllJobs_Data {
    data: Job[];
}
