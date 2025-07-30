"use client"
import { signOut } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function LogoutPage() {
    const handleSignOut = async () => {
        try {

            await fetch('/api/auth/logout').then((response) => {
                console.log("FusionAuth logout response:", response);
            })

            await signOut({ callbackUrl: '/' });
            console.log("User signed out successfully");
            // Redirect to the home page or any other page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    window.onload = () => {
        handleSignOut();
    }

  return (
    <div>
        <h1>Logging out...</h1>
    </div>
  )
}

export default LogoutPage
