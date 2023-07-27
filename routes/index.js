/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the NextJS Material Dashboard 2 PRO are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
*/

// NextJS Material Dashboard 2 PRO components
import MDAvatar from "/components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "/assets/images/team-3.jpg";

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
  // {
  //   type: "collapse",
  //   name: "Contact us",
  //   key: "contact-us",
  //   icon: <Icon fontSize="medium">mail_outline</Icon>,
  //   route: "/contact-us",
  //   noCollapse: true,
  //   bottom: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Log out",
  //   key: "log-out",
  //   icon: <Icon fontSize="medium">logout</Icon>,
  //   route: "/log-out",
  //   noCollapse: true,
  //   bottom: true,
  // },
];

export default routes;
