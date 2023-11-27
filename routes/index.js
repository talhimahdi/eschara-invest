import Icon from "@mui/material/Icon";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Overview",
  //   key: "overview",
  //   icon: <Icon fontSize="medium">dashboard</Icon>,
  //   route: "/overview",
  //   noCollapse: true,
  // },

  {
    type: "collapse",
    name: "Opportunities",
    key: "opportunities",
    icon: <Icon fontSize="medium">article</Icon>,
    collapse: [
      {
        name: "All",
        key: "all",
        route: "/opportunities/all",
      },
      {
        name: "Available",
        key: "available",
        route: "/opportunities/available",
      },
      {
        name: "Ongoing",
        key: "ongoing",
        route: "/opportunities/ongoing",
      },
      {
        name: "Closed",
        key: "closed",
        route: "/opportunities/closed",
      },
      {
        name: "Rejected",
        key: "rejected",
        route: "/opportunities/rejected",
      },
      {
        name: "Pipeline",
        key: "pipeline",
        route: "/opportunities/pipeline",
      },
    ],
  },

  // {
  //   type: "collapse",
  //   name: "Reporting",
  //   key: "reporting",
  //   icon: <Icon fontSize="medium">assessment</Icon>,
  //   route: "/reporting",
  //   noCollapse: true,
  // },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="medium">settings_applications</Icon>,
    route: "/settings",
    noCollapse: true,
  },
];

export default routes;
