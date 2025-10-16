"use client"
import Link from "next/link"
import { AlertCircle, LogIn, UserPlus } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { signIn } from "next-auth/react"

export default function Not_logged_In() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Access Restricted</h1>
          <p className="text-gray-600 mt-2">You need to be logged in to view this page</p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            This page requires you to be signed in to your account. As we care a lot about security and privacy, we will need you to login with the following credentials: <hr /> <br /> <br /> Username: buildm8@showcase.com <br /> Password: Password
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Choose an option below to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full" size="lg" >
                 <Button onClick={() => signIn('fusionauth', { callbackUrl: '/' })} variant="default" className="w-full">
                    Sign In with FusionAuth
                    </Button>
            </Button>

            <Button variant="default" disabled className="w-full" size="lg">
                
                    Sign Up with FusionAuth
                    
            </Button>

          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>
            Need help?
            <Link href="/" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
