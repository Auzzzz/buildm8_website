import React from 'react'

export interface JobSlugProps {
    id: string;
}

export default function Job_Individual(props: JobSlugProps) {
    const { id } = props;
  return (
    <div>
      Hi {id}, this is your job slug page.

      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">Job Details</h2>
        <p>Job ID: {id}</p>
        <p>Status: Open</p>
        <p>Description: This is a placeholder for job description.</p>
        <p>Created on: {new Date().toLocaleDateString()}</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

