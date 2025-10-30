export interface ApiCallOptions extends RequestInit {
  data?: any; // Request payload (for POST/PUT/PATCH)
  params?: Record<string, string>; // URL parameters
}

export async function apiCall<T>(
  url: string,
  options: ApiCallOptions = {}
): Promise<T> {
  try {
    // Handle query parameters
    const queryString = options.params
      ? `?${new URLSearchParams(options.params).toString()}`
      : '';
    const fullUrl = process.env.API_URL + url + queryString;

    // Configure headers
    const headers = new Headers(options.headers);
    if (options.data && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Configure body
    const body = options.data ? JSON.stringify(options.data) : undefined;

    // Execute fetch request
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      body,
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await parseResponse(response);
      throw new Error(
        `API Error: ${response.status} - ${response.statusText}`,
        { cause: errorData }
      );
    }

    // Parse successful response
    return await parseResponse<T>(response);
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Helper to handle different response types
async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    return response.json();
  }
  if (contentType.includes('text/')) {
    return response.text() as any;
  }
  return response.blob() as any;
}
