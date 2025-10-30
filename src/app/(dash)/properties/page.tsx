import { redirect } from "next/navigation";
import React from "react";
import All_Properties_List from "~/components/properties/allpropertieslist";
import { Button } from "~/components/ui/button";
import type {
  user_property,
  user_property_type,
} from "~/lib/types/api/user_property.types";
import { apiCall } from "~/server/server_lib/API";

export default async function Properties() {
  const response = await apiCall<user_property_type>("/user/properties", {
    method: "GET",
  });

  return (
    <div>
      <All_Properties_List data={response.properties} />
    </div>
  );
}
