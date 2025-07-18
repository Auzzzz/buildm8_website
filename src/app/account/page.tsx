"use server";
import Account_User_Information from "~/components/account/userInfomation";
import { auth } from "~/server/auth";
import { isTokenValid } from "~/server/server_lib/isLogged";
import { fusionClient } from "~/server/fusionClient";
import type { UserData } from "~/lib/types/fusionAuth";
import LoggedOut from "~/components/account/loggedout";
import { redirect } from "next/navigation";
import type { accountUpdateUser } from "~/lib/types/types_account";

async function getUserInformation(id: string) {
  try {
    const user = await fusionClient.retrieveUser(id);
    if (user.statusCode === 200) {
      return user.response.user;
    }
  } catch (error) {
    console.error("Error retrieving user information:", error);
    return false;
  }
}

async function updateUser(updatedUserData: accountUpdateUser) {
  "use server";
  try {
    // call FA to update user
    const user = await fusionClient.updateUser(updatedUserData.id, {
      user: {
        email: updatedUserData.email,
        firstName: updatedUserData.first_name,
        lastName: updatedUserData.last_name,
        mobilePhone: updatedUserData.mobile_number,
        username: updatedUserData.username,
        imageUrl: updatedUserData.imageUrl,
      },
    });
    if (user.statusCode === 200) {
      const updatedUserData: accountUpdateUser = {
        id: user.response.user!.id!,
        first_name: user.response.user!.firstName!,
        last_name: user.response.user!.lastName!,
        email: user.response.user!.email!,
        mobile_number: user.response.user!.mobilePhone!,
        username: user.response.user!.username!,
        imageUrl: user.response.user!.imageUrl!,
      };
      return updatedUserData;
    }
  } catch (error) {
    console.error("Error retrieving user information:", error);
  }
}

export default async function Page() {
  const valid = await isTokenValid();
  const session = await auth();
  const userInfo = await getUserInformation(session?.user?.id ?? "");

  if (!valid) {
    redirect("/login");
  }
  if( userInfo === false) { redirect("/")}

  if (session?.user?.id === userInfo?.id) {
    const userData = {
      id: userInfo!.id,
      first_name: userInfo!.firstName,
      last_name: userInfo!.lastName,
      email: userInfo!.email,
      verified: userInfo!.verified,
      last_login: userInfo!.lastLoginInstant,
      active: true,
      mobile_number: userInfo!.mobilePhone,
      username: userInfo!.username,
      imageUrl: userInfo!.imageUrl,
    } as UserData;


    return (
      <Account_User_Information userData={userData} updateUser={updateUser} />

    );
  } else {
    console.error("User info not matching", session?.user?.id, userInfo?.id);
    // TODO: create error page
    return <LoggedOut />;
  }
}
