"use client"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function LogoutPage() {
    const router = useRouter();
    console.log("SignOut---------------------------------------");
    // useEffect(() => {
    //     signOut({redirect: false, callbackUrl: "/" }).then(() => {
    //         router.push("/logoff");
    //     });
    // }, [router]);
  return (
    <div>
        <h1>Logging out...</h1>
    </div>
  )
}

export default LogoutPage
