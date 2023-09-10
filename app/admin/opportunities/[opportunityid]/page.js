// "use client";

// import React, { useMemo } from "react";
// import MDBox from "../../../../components/MDBox";
// import MDTypography from "../../../../components/MDTypography";
// import MDDropzone from "../../../../components/MDDropzone";

// function Opportunity() {
//   return (
//     <>
//       <MDBox>
//         <MDTypography variant="h5">Media</MDTypography>
//         <MDBox mt={3}>
//           <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
//             <MDTypography
//               component="label"
//               variant="button"
//               fontWeight="regular"
//               color="text"
//             >
//               Product Image
//             </MDTypography>
//           </MDBox>
//           {useMemo(
//             () => (
//               <MDDropzone options={{ addRemoveLinks: true }} />
//             ),
//             []
//           )}
//         </MDBox>
//       </MDBox>
//     </>
//   );
// }

// export default Opportunity;

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
  const opportunityId = parseInt(Number(params.opportunityId));

  if (
    !session ||
    (session.user.role != "admin" && session.user.role != "manager")
  ) {
    console.log(session.user.role);
    // redirect("/");
  }

  if (opportunityId != params.opportunityId) {
    console.log(params.opportunityId + "  " + opportunityId);
    // redirect("/");
  }

  // const opportunityData = await getOpportunityData(opportunityId);
  // console.log(opportunityData);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={0} mb={9}>
        {/* <FormEdit opportunity={opportunityData} /> */}
      </MDBox>
    </DashboardLayout>
  );
}
