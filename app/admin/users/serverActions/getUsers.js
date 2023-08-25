"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function getUsers() {
  const session = await getServerSession(authOptions);

  if (session) {
    const usersRes = await fetch(`${process.env.BACKEND_API_URL}/admin/users`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.apiToken}`,
      },
    });

    const usersData = await usersRes.json();

    return usersData;
  }
}

export { getUsers };
