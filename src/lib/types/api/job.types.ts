export interface Job {
    jobID: string;
    title: string;
    description: string;
    jobCreatorID: string;
    jobBudget: number;
    createdAt: string;
    updatedAt: string;
    jobStatus: string;
}

export interface Job_Data {
  data: Job;
}
