import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getRoles from "../serverActions/getRoles";
import getUserById from "../serverActions/getUserById";

import FormAdd from "../components/FormAdd";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import MDBox from "../../../../components/MDBox";
import FormEdit from "../components/FormEdit";

const getRolesData = async () => {
  const roles = await getRoles();
  return roles;
};
const getUserData = async (id) => {
  const userData = await getUserById(id);
  return userData;
};
export default async function EditUser({ params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role != "admin") {
    redirect("/");
  }

  const userId = parseInt(Number(params.userid));

  if (userId != params.userid || userId === 1) {
    redirect("/");
  }
  const roles = await getRolesData();
  const userData = await getUserData(userId);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        <FormEdit roles={roles} user={userData.user} />
      </MDBox>
    </DashboardLayout>
  );
}
