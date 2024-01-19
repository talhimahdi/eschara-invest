"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export default async function isBigboy() {
  // const session = await getServerSession(authOptions);

  // if (session) {
  const res = await fetch(`${process.env.BACKEND_API_URL}/isbigboy`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.user.apiToken}`,
    },
  });

  const response = await res.json();

  return response;
  // }
}