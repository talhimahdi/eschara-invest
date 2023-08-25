"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function changeUserStatus(userId, status) {
  const session = await getServerSession(authOptions);

  if (session) {
    const addUserReq = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users/changeStatus`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },

        body: JSON.stringify({
          userId,
          status,
        }),
      }
    );

    const response = await addUserReq.json();

    revalidatePath("/admin/users");

    return response;
  }
}
