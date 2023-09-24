import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getManagers from "../serverActions/getManagers";

import FormAdd from "../components/FormAdd";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import MDBox from "../../../../components/MDBox";

const getRolesData = async () => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role != "admin" && session.user.role != "manager")
  ) {
    redirect("/");
  }
};

export default async function AddOpportunity() {
  const managers = await getManagers();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        <FormAdd managers={managers} />
      </MDBox>
    </DashboardLayout>
  );
}
