"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function deleteOpportunity(opportunityId) {
  const session = await getServerSession(authOptions);

  if (session) {
    const deleteOpportunityReq = await fetch(
      `${process.env.BACKEND_API_URL}/admin/opportunities/${opportunityId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      }
    );

    const response = await deleteOpportunityReq.json();
    revalidatePath("/admin/opportunities");

    return response;
  }
}
