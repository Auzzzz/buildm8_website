import Job_Individual from "~/components/jobs/jobindividual"

export default async function Job_Slug({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <Job_Individual id={slug} />
}