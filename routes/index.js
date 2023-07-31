// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Overview",
    key: "overview",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/overview",
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Opportunities",
    key: "opportunities",
    icon: <Icon fontSize="medium">article</Icon>,
    collapse: [
      {
        name: "Available",
        key: "available",
        route: "/opportunities/available",
      },
      {
        name: "Available soon",
        key: "available-soon",
        route: "/opportunities/available-soon",
      },
      {
        name: "Ongoing",
        key: "ongoing",
        route: "/opportunities/ongoing",
      },
      {
        name: "Won",
        key: "won",
        route: "/opportunities/won",
      },
      {
        name: "Lost",
        key: "lost",
        route: "/opportunities/lost",
      },
    ],
  },

  {
    type: "collapse",
    name: "Reporting",
    key: "reporting",
    icon: <Icon fontSize="medium">assessment</Icon>,
    route: "/reporting",
    noCollapse: true,
  },
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
