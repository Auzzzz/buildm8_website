import React from 'react'
import type { Job } from '~/lib/types/api/job.types';

export interface JobSlugProps {
    id: string;
    jobDetails: Job;
}

export default function Job_Individual(props: JobSlugProps) {
    const { id, jobDetails } = props;
  return (
    <div>
      Hi {id}, this is your job slug page.

      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">Job Details</h2>
        <p>Job ID: {jobDetails.jobID}</p>
        <p>Status: {jobDetails.jobStatus}</p>
        <p>Description: {jobDetails.description}</p>
        <p>Created on: {jobDetails.createdAt}</p>
        <p>Last updated: {jobDetails.updatedAt}</p>
      </div>
    </div>
  )
}

