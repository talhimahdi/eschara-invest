"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export default async function getRoles() {
  const session = await getServerSession(authOptions);

  if (session) {
    const rolesRes = await fetch(`${process.env.BACKEND_API_URL}/admin/roles`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.apiToken}`,
      },
    });

    const rolesData = await rolesRes.json();

    return rolesData;
  }
}
