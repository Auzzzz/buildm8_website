import Job_Individual from "~/components/jobs/jobindividual"
import type { Job_Data } from "~/lib/types/api/job.types"
import { apiCall } from "~/server/server_lib/API"

export default async function Job_Slug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  console.log("Job_Slug params:", slug)

  const job = await apiCall<Job_Data>("/job/" + slug, { method: "GET" })
  

  console.log("JobAPI job:", job)

  return <Job_Individual id={slug} jobDetails={job.data} />
}