import { unstable_cache } from "next/cache";
import { fusionClient } from "../fusionClient";
import type FusionAuthClient from "@fusionauth/typescript-client";
import type { FusionAuthUser } from "~/lib/types/fusionAuth";

export const getCachedUser = unstable_cache(
  async (userID: string) => {
    console.log('Fetching user from FusionAuth (uncached)');
    const { response } = await fusionClient.retrieveUser(userID);
    return response as FusionAuthUser;
  },
  ['fusionauth-user'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['user'], // Revalidate by tag
  }
);