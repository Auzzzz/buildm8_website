import { getSession } from "next-auth/react";
import type { ApiCallOptions } from "~/server/server_lib/API";

// ApiCallOptions comes from serverside API Call client
export async function clientApiCall<T>(
  url: string,
  options: ApiCallOptions = {},
): Promise<T> {
  const session = await getSession();

  // query string params
  const queryString = options.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : "";
  const fullUrl = process.env.NEXT_PUBLIC_API_URL + url + queryString;

	const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.accessToken && {
        'Authorization': `Bearer ${session.accessToken}`
      }),
      ...options.headers, 
    },
	method: options.method,
	body: options.body
  });

  //TODO: User error messages

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}
