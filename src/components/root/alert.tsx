import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import React from "react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

interface AlertModuleProps {
  time: number; // in seconds
  header: string;
  message: string;
  list?: string[];
  type: "success" | "error" | "info";
}

export default function AlertModule({
  time,
  header,
  message,
  list = [],
  type,
}: AlertModuleProps) {
  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      <CheckCircle2Icon />
      <AlertTitle>{header}</AlertTitle>
      <AlertDescription>
        {message}
        {list.length > 0 && (
          <ul className="mt-2 list-inside list-disc text-sm">
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
    //   <Alert>
    //     <PopcornIcon />
    //     <AlertTitle>
    //       This Alert has a title and an icon. No description.
    //     </AlertTitle>
    //   </Alert>
    //   <Alert variant="destructive">
    //     <AlertCircleIcon />
    //     <AlertTitle>Unable to process your payment.</AlertTitle>
    //     <AlertDescription>
    //       <p>Please verify your billing information and try again.</p>
    //       <ul className="list-inside list-disc text-sm">
    //         <li>Check your card details</li>
    //         <li>Ensure sufficient funds</li>
    //         <li>Verify billing address</li>
    //       </ul>
    //     </AlertDescription>
    //   </Alert>
  );
}
