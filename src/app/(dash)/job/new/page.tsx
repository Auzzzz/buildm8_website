"use client";
import React, { useState } from "react";
import { newJobSchema } from "~/lib/formSchema/newjob.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { FormItem_Input } from "~/components/FormItem_Input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

export default function Job_New() {
  // Zod Form
  const form = useForm<z.infer<typeof newJobSchema>>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      address: "",
      jobTitle: "",
      jobDescription: "",
      jobType: "Quote",
    },
  });

  const [disabled, setDisabled] = useState(false);

  // Get the values from the form & submit job to API
  const onSubmit = async () => {
    setDisabled(true);
    const formData = form.getValues();
    console.log("Form Data:", formData);

    // Here you would typically send the data to your API
    // For example:
    // const response = await fetch('/api/jobs', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

    // Reset the form after submission
    form.reset();
    setDisabled(false);
  };

  //TODO: add in address autocomplete & map location
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Create a new Job</h1>
      <div className="grid grid-cols-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row p-1">
              <FormItem_Input
                className="w-full p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="jobTitle"
                label="Job Title"
                type="text"
                placeholder="Job Title"
                disabled={disabled}
              />
            </div>
            <div className="flex flex-row p-1">
              <FormItem_Input
                className="w-full p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="jobDescription"
                label="Job Description"
                type="textarea"
                placeholder="A perfect place to outline exactly what you expect to happen on this job."
                description="Please be as detailed as possible."
                disabled={disabled}
              />
            </div>
            <div className="flex flex-row p-1">
              <FormItem_Input
                className="w-full p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="address"
                label="Address"
                type="text"
                placeholder="1234 Sesame street, Melbourne, Victoria, 3000"
                disabled={disabled}
              />
            </div>

            <div className="flex flex-wrap"></div>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
