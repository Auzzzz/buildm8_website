import React from 'react'
import { auth } from '~/server/auth';
import { apiCall } from '~/server/server_lib/API';

export default async function Test() {
  const session = await auth();
  console.log("Test session:", session?.accessToken);



  const call = await apiCall('/test/getme', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${session?.accessToken}`
    }
  });

  return (
    <div>Test</div>
  )
}
