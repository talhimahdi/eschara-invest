"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function editOpportunity(opportunity) {
  const session = await getServerSession(authOptions);

  // opportunity = {...opportunity, _method: "PUT"};

  if (session) {
    const editOpportunityReq = await fetch(
      `${process.env.BACKEND_API_URL}/admin/opportunities/${opportunity.id}`,
      {
        method: "PUT",
        // method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },

        body: JSON.stringify(opportunity),
      }
    );

    const response = await editOpportunityReq.json();

    revalidatePath("/admin/opportunities");

    return response;
  }
}
