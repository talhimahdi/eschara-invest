import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getRoles from "../serverActions/getRoles";

import FormAdd from "../components/FormAdd";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import MDBox from "../../../../components/MDBox";

const getRolesData = async () => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role != "admin") {
    redirect("/");
  }

  const roles = await getRoles();
  return roles;
};

export default async function AddUser() {
  const roles = await getRolesData();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        <FormAdd roles={roles} />
      </MDBox>
    </DashboardLayout>
  );
}
