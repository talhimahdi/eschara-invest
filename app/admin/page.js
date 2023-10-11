import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session && session.user.role == "admin") {
    //
    redirect("/admin/users");
  }
  if (session && session.user.role == "manager") {
    redirect("/admin/opportunities");
  }
}
