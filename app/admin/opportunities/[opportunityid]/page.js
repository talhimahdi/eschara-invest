import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getOpportunityById from "../serverActions/getOpportunityById";

import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import MDBox from "../../../../components/MDBox";
import FormEdit from "../components/FormEdit";

const getOpportunityData = async (id) => {
  const opportunityData = await getOpportunityById(id);

  console.log("id " + id);
  if (opportunityData.status && opportunityData.opportunity) {
    return opportunityData.opportunity;
  }
  // redirect("/404");

  return false;
};
export default async function EditOpportunity({ params }) {
  const session = await getServerSession(authOptions);
  const opportunityId = parseInt(Number(params.opportunityid));

  if (
    !session ||
    (session.user.role != "admin" && session.user.role != "manager")
  ) {
    console.log("role " + session.user.role);
    // redirect("/");
  }

  if (opportunityId != params.opportunityid) {
    console.log("param " + params.opportunityid);
    // redirect("/");
  }

  const opportunityData = await getOpportunityData(opportunityId);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        <FormEdit opportunity={opportunityData} />
      </MDBox>
    </DashboardLayout>
  );
}
