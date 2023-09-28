"use server";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import OpportunitiesList from "./components/OpportunitiesList";
import getOpportunities from "./serverActions/getOpportunities";

import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import MDBox from "/components/MDBox";

const callGetOpportunities = async () => {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    (session.user.role != "admin" && session.user.role != "manager")
  ) {
    redirect("/");
  }

  const opportunitiesRes = await getOpportunities();

  if (opportunitiesRes.status) {
    const result = opportunitiesRes.opportunities.map((op) => {
      return {
        ...op,
      };
    });
    return result;
  } else {
    return false;
  }
};

export default async function Opportunities() {
  const opportunitiesData = await callGetOpportunities();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox mb={3}>
          <OpportunitiesList opportunities={opportunitiesData} />
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}
