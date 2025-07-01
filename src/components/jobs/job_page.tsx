"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Building2, Hammer } from "lucide-react";
import { redirect } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import All_Job_List from "~/components/jobs/alljoblist";
import { Job_List } from "~/components/jobs/joblist";
import { Pie_Chart } from "~/components/jobs/piechart";
import Search_Company_Dialog from "~/components/jobs/searchcompanydialog";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { AllJobs_Data } from "~/lib/types/api/job.types";
import { useSession } from "next-auth/react";
import { onlyOpenJobStatuses } from "~/lib/utils/utils.job";

interface JobPageProps {
  jobData: AllJobs_Data;
}


export default function Job_Page(props: JobPageProps) {


  if (!props.jobData || !props.jobData.data) {
    return <div>No job data available</div>;
  }

const jobData = props.jobData
const openJobs = jobData.data.filter((job) =>
  !onlyOpenJobStatuses.includes(job.jobStatus)
)

console.log("openJobs:", openJobs.length);

  return (
     <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div>Open Jobs</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-2">
                  <Hammer size={52} strokeWidth={0.5} />
                  <h1 className="text-4xl">{openJobs.length}</h1>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div>Wroked with</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-2">
                  <Building2 size={52} strokeWidth={0.5} />
                  <h1 className="text-4xl">12 business</h1>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div>Open Jobs</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-2">
                  <Hammer size={52} strokeWidth={0.5} />
                  <h1 className="text-4xl">12</h1>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Button
              variant="outline"
              className="backgroundColor: bg-test"
              onClick={() => redirect("/job/new")}
            >
              Create a Job
            </Button>
            <Button variant="outline" disabled onClick={() => console.log("add me, search company page")}>Search for a Company</Button>
            <Button variant="outline" disabled onClick={() => console.log("add me, view receipts ")}>View Receipts</Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2">
            <Job_List jobs={jobData} />
            <Pie_Chart
              name="Test Chart"
              description="This is a test chart"
              trending="all trends go up"
              trending_description="#trust"
            />
          </div>
                <div className="mt-8 p-2">
                    
                    <h4 className="text-2xl">All Jobs</h4>
                    <hr className="my-2" />
          <All_Job_List data={jobData.data} />
                </div>
        </div>
  )
}
