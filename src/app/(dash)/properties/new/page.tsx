"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { FormItem_Input } from "~/components/FormItem_Input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { newPropertySchema } from "~/lib/formSchema/newproperty.schema";
import { apiCall } from "~/server/server_lib/API";
import { clientApiCall } from "~/lib/apiClient";
import AlertModule from "~/components/root/alert";

export default function Property_New() {
  // Zod Form
  const form = useForm<z.infer<typeof newPropertySchema>>({
    resolver: zodResolver(newPropertySchema),
    defaultValues: {
      property_nickname: "",
      property_address: "",
      property_suburb: "",
      property_state: "",
      property_postcode: "",
      property_type: "House",
      property_use: "Owner Occupied",
    },
  });



  const [disabled, setDisabled] = useState(false);

  const australianStates = [
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
  ];

	// Get values from the zod enums for dropdowns
	const propertyTypeOptions = newPropertySchema.shape.property_type._def.values.map((value: string) => ({
  value: value,
  label: value
}));

	const propertyUseOptions = newPropertySchema.shape.property_use._def.values.map((value: string) => ({
  value: value,
  label: value
}));

  // Get the values from the form & submit job to API
  const onSubmit = async () => {
    // setDisabled(true);
    const formData = form.getValues();
    console.log("Form Data:", formData);

    // // For example:
    // const response = await fetch('http://localhost:4000/user/properties', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

		const post = await clientApiCall("/user/properties", {
			method: "POST",
			body: JSON.stringify(formData),
		});

		console.log(post)

    // // Reset the form after submission
    // form.reset();
    // setDisabled(false);
  };

  //TODO: add in address autocomplete & map location
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Add a New Property</h1>
      <div className="grid grid-cols-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row p-1">
              <FormItem_Input
                className="w-full p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_nickname"
                label="Property Nickname"
                type="text"
                placeholder="Old Blue"
                disabled={disabled}
              />
            </div>
            <div className="flex flex-row p-1">
              <FormItem_Input
                className="w-1/2 p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_address"
                label="Property Address"
                type="text"
                placeholder="1234 Sesame street"
                disabled={disabled}
              />

              <FormItem_Input
                className="w-1/2 p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_suburb"
                label="Suburb"
                type="text"
                placeholder="Melbourne"
                disabled={disabled}
              />
            </div>
            <div className="flex flex-row p-1">
              <FormItem_Input
                className="w-1/2 p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_postcode"
                label="Postcode"
                type="number"
                placeholder="3000"
                disabled={disabled}
              />

              <FormItem_Input
                className="w-1/2 p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_state"
                label="State"
                type="select"
                placeholder="Select a state"
                options={australianStates}
                disabled={disabled}
              />
            </div>
						<div className="flex flex-row p-1">

							<FormItem_Input
                className="w-1/2 p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_type"
                label="Type of Property"
                type="select"
                placeholder="Select a type"
                options={propertyTypeOptions}
                disabled={disabled}
              />

              <FormItem_Input
                className="w-1/2 p-1"
                control={form.control as unknown as Control<FieldValues>}
                name="property_use"
                label="State"
                type="select"
                placeholder="Select a state"
                options={propertyUseOptions}
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
