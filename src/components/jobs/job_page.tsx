"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Building2, Hammer } from "lucide-react";
import { redirect } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import All_Job_List, { type Payment } from "~/components/jobs/alljoblist";
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

interface JobPageProps {
  jobData: AllJobs_Data;
}


export default function Job_Page(props: JobPageProps) {



const jobData = props.jobData
console.log("Job_Page1 jobData:", jobData);

const payments: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];


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
                  <h1 className="text-4xl">12</h1>
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
          <All_Job_List data={payments} />
                </div>
        </div>
  )
}
