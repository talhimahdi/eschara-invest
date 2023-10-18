import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getManagers from "../serverActions/getManagers";
import getStatuses from "../serverActions/getStatuses";

import FormAdd from "../components/FormAdd";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import MDBox from "../../../../components/MDBox";

export default async function AddOpportunity() {
  const managers = await getManagers();
  const statuses = await getStatuses();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        <FormAdd managers={managers} statuses={statuses} />
      </MDBox>
    </DashboardLayout>
  );
}
