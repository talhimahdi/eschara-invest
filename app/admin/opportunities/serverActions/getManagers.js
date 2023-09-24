"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export default async function getManagers() {
  const session = await getServerSession(authOptions);

  if (session) {
    const managersRes = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users/getManagers`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      }
    );

    const managersData = await managersRes.json();

    return managersData;
  }
}
