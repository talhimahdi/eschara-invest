"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export default async function opportunitySecondRoundAccepted(data) {
  const session = await getServerSession(authOptions);

  if (session) {
    const editOpportunityReq = await fetch(
      `${process.env.BACKEND_API_URL}/opportunities/opportunity-secondrounnd-accepted`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },

        body: JSON.stringify(data),
      }
    );

    const response = await editOpportunityReq.json();

    return response;
  }
}
