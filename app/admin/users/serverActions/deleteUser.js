"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function deleteUser(userId) {
  const session = await getServerSession(authOptions);

  if (session) {
    const deleteUserReq = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      }
    );

    const response = await deleteUserReq.json();
    revalidatePath("/admin/users");

    return response;
  }
}
