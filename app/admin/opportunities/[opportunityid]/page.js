import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getOpportunityById from "../serverActions/getOpportunityById";

import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import MDBox from "../../../../components/MDBox";
import FormEdit from "../components/FormEdit";

console.log("init");

const getOpportunityData = async (id) => {
  const opportunityData = await getOpportunityById(id);

  console.log(opportunityData);
  if (opportunityData.status && opportunityData.opportunity) {
    return opportunityData.opportunity;
  }
  // redirect("/404");

  return false;
};
export default async function EditOpportunity({ params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role != "admin") {
    console.log("role " + session.user.role);
    // redirect("/");
  }

  const opportunityId = parseInt(Number(params.opportunityid));

  if (opportunityId != params.opportunityid) {
    console.log("param " + params.opportunityid);
    // redirect("/");
  }

  const opportunityData = await getOpportunityData(opportunityId);
  console.log(opportunityData);

  // // if (
  // //   !session ||
  // //   (session.user.role != "admin" && session.user.role != "manager")
  // // ) {
  // //   console.log(session.user.role);
  // //   redirect("/");
  // // }
  // // console.log("good" + "  " + opportunityId);
  // // console.log("good" + "  " + params.opportunityId);

  // // // if (opportunityId != params.opportunityId) {
  // // //   console.log(params.opportunityId + "  " + opportunityId);
  // // //   // redirect("/");
  // // // }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        <FormEdit opportunity={opportunityData} />
      </MDBox>
    </DashboardLayout>
  );
}
