// import { useEffect } from "react";
// import { Icon } from "@mui/material";
// import MDBox from "../components/MDBox";
// import MDTypography from "../components/MDTypography";
// import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   // const router = useRouter();
//   // useEffect(() => {
//   //   router.push("/overview");
//   // });
//   return (
//     <>
//       {/* <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//         <MDTypography variant="body1">Home page.</MDTypography>
//       </MDBox>
//     </DashboardLayout> */}
//     </>
//   );
// }

// Home.getInitialProps = async (ctx) => {
//   const { res } = ctx;

//   res.writeHead(301, { location: "/hello" });

//   res.end();
// };

import { redirect } from "next/navigation";
export default async function Home() {
  redirect("/login");
}
