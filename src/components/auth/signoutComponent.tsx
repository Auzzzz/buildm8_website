"use client"
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutComponent() {

    console.log("SignOutComponent rendered");

    useEffect(() => {
        signOut();
    }, []);

    return (
        <div>
            Signing Out
            </div>
    )

}
   
