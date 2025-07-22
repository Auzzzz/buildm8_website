import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { fusionClient } from "~/server/fusionClient";

export async function GET(request: NextRequest) {
  console.log("GET request to logout API");
  try {
    console.log("Logout API called");
    
    // const session = await auth();
    // console.log("Session on logout:", session);

    // // If there's a session with a refresh token, logout from FusionAuth
    // if (session?.refreshToken) {
    //   try {
    //     await fusionClient.logout(true, session.refreshToken).then((response) => {
    //       console.log("FusionAuth logout response:", response);

    //       if (response.statusCode === 200) {
    //         console.log("Successfully logged out from FusionAuth");
    //         // redirect("/logoff")

    //       } else {
    //         console.error("Failed to log out from FusionAuth:", response.statusCode);
    //       }
    //     }).catch((error) => {
    //       console.error("Error during FusionAuth logout:", error);
    //     });

    //   } catch (error) {
    //     console.error("Error logging out from FusionAuth:", error);
    //   }
    // }
    
  } catch (error) {
    console.error("Error in logout handler:", error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}