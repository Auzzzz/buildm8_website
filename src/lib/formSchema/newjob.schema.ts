
import { z } from "zod";

export const newJobSchema = z.object({

    address: z.string().min(1, {message: "A address is required.",}),
    jobTitle: z.string().min(5, {message: "A job title is required.",}),
    jobDescription: z.string().min(10, {message: "A job description is required.",}),
    jobType: z.enum(["Repair", "Addition", "Replacement", "Emergency Fix", "Quote"], {
        message: "Please select a job type.",
        }),
    


//   first_name: z.string().min(2, {
//     message: "First Name must be at least 2 characters.",
//   }),
//   last_name: z.string().min(2, {
//     message: "Last Name be at least 2 characters.",
//   }),

//   email: z.string().email({message: "Please enter a valid email address.",}),
//   phone_number: z.string().optional(),
//   mobile_number: z.string().min(10, { message: "Mobile number must be at least 10 characters." }).max(10, { message: "Mobile number must be at less than 10 characters." }),
//   username: z.string().min(5, { message: "Username must be at least 5 characters." }).max(30, { message: "Username must be at less than 30 characters." }),
//   imageUrl: z.string()
  

})

