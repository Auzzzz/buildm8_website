import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { fusionClient } from "~/server/fusionClient";

export async function GET(request: NextRequest) {
  console.log("GET request to logout API");
  try {
    console.log("Logout API called");

    const session = await auth();
    console.log("Session on logout API:", session);

    // If there's a session with a refresh token, logout from FusionAuth
    if (session?.refreshToken) {
      try {
        const response = await fusionClient.logout(true, session.refreshToken);
        console.log("FusionAuth logout response:", response.response);

        if (response.statusCode === 200) {
          console.log("Successfully logged out from FusionAuth");
        } else {
          console.error("Failed to log out from FusionAuth:", response.statusCode);
        }
      } catch (error) {
        console.error("Error logging out from FusionAuth:", error);
      }
    }

    // Clear NextAuth session by redirecting to built-in signout
    
    return NextResponse.redirect("/");
    
  } catch (error) {
    console.error("Error in logout handler:", error);
    return NextResponse.json({
      status: false,
      message: "Log Out Error",
    }, { status: 500 });
  }
}
