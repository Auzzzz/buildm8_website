import { redirect } from "next/navigation";
import { use } from "react";
import toast from "react-hot-toast";
import Job_Page from "~/components/jobs/job_page";
import { type AllJobs_Data, type Job_Data } from "~/lib/types/api/job.types";
import { auth, signOut } from "~/server/auth";
import { apiCall } from "~/server/server_lib/API";

export default async function Job() {
		
  const session = await auth();
  // var userInfo = false
  var error = false;

  if (error) {
    redirect("/error");
  }

  // Get the userID to call the API to fetch all jobs for the user, return the Job_Page component with the data
 

    try {
      const jobData = await apiCall<AllJobs_Data>(`/job/user/${userID}`, {
        method: "GET",
      });

      console.log("JobAPI jobData:", jobData);
      return (
        <div>
          <Job_Page jobData={jobData}/>
        </div>
      );
    } catch (error) {
      console.error("Error fetching job data:", error);

      return redirect("/error");
    }
}
