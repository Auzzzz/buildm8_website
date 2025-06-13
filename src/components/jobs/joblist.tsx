"use client"
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Button } from '../ui/button';

interface JobListProps {
    jobs: Array<{
        id: string;
        status: string;
        company: string;
        amount: string;
    }>;
    }

export function Job_List(props: JobListProps) {

    const clicked = (id: string) => {
        console.log("Button clicked", id);
    }
  
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
    {props.jobs.map((job) => (
      <TableRow key={job.id}>
        <TableCell className="font-medium">
          <Button variant="outline" onClick={() => clicked(job.id)}>{job.id}</Button>
        </TableCell>
        <TableCell>{job.status}</TableCell>
        <TableCell>{job.company}</TableCell>
        <TableCell className="text-right">{job.amount}</TableCell>
      </TableRow>
    ))}
    {/* <TableRow>
      <TableCell className="font-medium"><Button variant="link" onClick={clicked}>Ghost</Button></TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow> */}
  </TableBody>
</Table>
    </div>
  )
}

