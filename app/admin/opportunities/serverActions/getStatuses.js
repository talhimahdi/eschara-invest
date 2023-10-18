"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export default async function getStatuses() {
  const session = await getServerSession(authOptions);

  if (session) {
    const statusesRes = await fetch(
      `${process.env.BACKEND_API_URL}/admin/statuses`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      }
    );

    const statusesData = await statusesRes.json();

    return statusesData;
  }
}
