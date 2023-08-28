"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function getOpportunities() {
  const session = await getServerSession(authOptions);

  if (session) {
    const opportunitiesRes = await fetch(
      `${process.env.BACKEND_API_URL}/admin/opportunities`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      }
    );

    const opportunitiesData = await opportunitiesRes.json();

    return opportunitiesData;
  }
}
