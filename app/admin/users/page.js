import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import UsersList from "./components/UsersList";
import { getUsers as getUsersAction } from "./serverActions/getUsers";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import MDBox from "/components/MDBox";

const getUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role != "admin") {
    redirect("/");
  }

  const users = await getUsersAction();
  return {
    columns: [
      { Header: "id", accessor: "id" },
      { Header: "email", accessor: "email" },
      { Header: "role", accessor: "role" },
      { Header: "status", accessor: "status" },
      { Header: "first name", accessor: "first_name" },
      { Header: "last name", accessor: "last_name" },
      { Header: "town", accessor: "town" },
      { Header: "country", accessor: "country" },
    ],
    rows: users
      ? users.map((user) => ({
          ...user,
          actions: user.id != 1 &&
            user.id != session.user.id && {
              edit: `/admin/users/${user.id}`,
              delete: "/delete",
            },
        }))
      : [],
  };
};

export default async function Users() {
  const usersData = await getUsers();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox mb={3}>
          <UsersList data={usersData} />
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}
