"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function getOpportunityById(opportunityId) {
  const session = await getServerSession(authOptions);

  if (session) {
    const opportunityRes = await fetch(
      `${process.env.BACKEND_API_URL}/admin/opportunities/${opportunityId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      }
    );

    const opportunityData = await opportunityRes.json();

    return opportunityData;
  }
}
