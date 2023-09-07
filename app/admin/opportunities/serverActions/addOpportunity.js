"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function addOpportunity(opportunity) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const addUserReq = await fetch(
        `${process.env.BACKEND_API_URL}/admin/opportunities`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.apiToken}`,
          },

          body: JSON.stringify(opportunity),
        }
      );

      const response = await addUserReq.json();
      revalidatePath("/admin/opportunities");

      return response;
    } catch (error) {
      console.log("ERRR: " + error);
    }
  }
}
