"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "../ui/button";
import type { AllJobs_Data } from "~/lib/types/api/job.types";
import { displayDateAU } from "~/lib/utils";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { onlyOpenJobStatuses } from "~/lib/utils/utils.job";

interface JobListProps {
  jobs: AllJobs_Data;
}


//TODO: Make open job list display better when inline with chart


export function Job_List(props: JobListProps) {
  const router = useRouter();
  const clicked = (id: string) => {
    console.log("Button clicked", id);
  };

  var jobData = props.jobs.data;

  // remove a job if it has a jobStatus of "closed"
  jobData = jobData.filter((job) =>
  !onlyOpenJobStatuses.includes(job.jobStatus)
);

  console.log("Job_List jobData12345678:", jobData);

  return (
    <div>
      <Table>
        <TableCaption>A list of your open jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Job ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {props.jobs.map((job) => (
      <TableRow key={job.id}>
        <TableCell className="font-medium">
          <Button variant="outline" onClick={() => clicked(job.id)}>{job.id}</Button>
        </TableCell>
        <TableCell>{job.status}</TableCell>
        <TableCell>{job.company}</TableCell>
        <TableCell className="text-right">{job.amount}</TableCell>
      </TableRow>
    ))} */}

          {props.jobs.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs available.
              </TableCell>
            </TableRow>
          ) : (
            jobData.map((job, index) => (
              <TableRow key={job.jobID}>
                <TableCell className="font-medium">
                  <Button variant="outline" onClick={() => router.push(`/job/${job.jobID}`)}>
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{job.jobStatus}</TableCell>
                <TableCell>{displayDateAU(job.createdAt)}</TableCell>
                <TableCell className="text-right">{job.jobBudget}</TableCell>
              </TableRow>
            ))
          )}

          {/* <TableRow>
      <TableCell className="font-medium"><Button variant="link" onClick={clicked}>Ghost</Button></TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
