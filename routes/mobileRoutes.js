// @mui icons
import Icon from "@mui/material/Icon";
const mobileRoutes = [
  {
    name: "Overview",
    key: "overview-mobile",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/overview",
  },

  {
    name: "Opportunities",
    key: "opportunities-mobile",
    icon: <Icon fontSize="medium">article</Icon>,
    route: "/opportunities/all",
  },

  // {
  //   name: "Reporting",
  //   key: "reporting-mobile",
  //   icon: <Icon fontSize="medium">assessment</Icon>,
  //   route: "/reporting",
  // },
];

export default mobileRoutes;
