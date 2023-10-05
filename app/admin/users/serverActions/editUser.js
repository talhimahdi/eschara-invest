"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export default async function editUser(user) {
  const session = await getServerSession(authOptions);

  const {
    first_name,
    last_name,
    email,
    password,
    address,
    address2,
    comment,
    role,
    status,
    zip_code,
    town,
    country,
  } = user;

  if (session) {
    const editUserReq = await fetch(
      `${process.env.BACKEND_API_URL}/admin/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.apiToken}`,
        },

        // body: JSON.stringify({
        //   first_name,
        //   last_name,
        //   email,
        //   password,
        //   address,
        //   address2,
        //   comment,
        //   role,
        //   status,
        //   zip_code,
        //   town,
        //   country,
        // }),
        body: JSON.stringify(user),
      }
    );

    const response = await editUserReq.json();

    revalidatePath("/admin/users");

    return response;
  }
}
