import { useState } from "react";
import colors from "../../../assets/theme/base/colors";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import {
  Dashboard,
  Article,
  Assessment,
  Add,
  Remove,
} from "@mui/icons-material";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context";

import mobileRoutes from "../../../routes/mobileRoutes";
import { useRouter } from "next/navigation";

function MobileNavBar() {
  const router = useRouter();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;

  const [value, setValue] = useState(0);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setMiniSidenav(dispatch, true);
      }}
      showLabels
      sx={{
        display: { xs: "flex", md: "none" },
        p: 1,
        gap: 1,
        height: 80,
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: colors.escharaThemePrimary.main,

        "& .MuiBottomNavigationAction-root": {
          color: colors.white.main,
          gap: 1,
        },
        "& .MuiBottomNavigationAction-label": {
          color: colors.white.main,
          fontSize: 14,
        },

        "& .Mui-selected": {
          color: colors.white.main + "!important",
          backgroundColor: "#434461",
          borderRadius: 2,
        },

        "& svg": {
          color: colors.white.main,
          width: 22,
          height: 22,
        },
      }}
    >
      {mobileRoutes.map((route) => (
        <BottomNavigationAction
          key={route.key}
          label={route.name}
          icon={route.icon}
          onClick={() => router.push(route.route)}
        />
      ))}

      {miniSidenav ? (
        <BottomNavigationAction
          label="More"
          icon={<Add />}
          onClick={handleMiniSidenav}
        />
      ) : (
        <BottomNavigationAction
          label="Less"
          icon={<Remove />}
          onClick={handleMiniSidenav}
        />
      )}
    </BottomNavigation>
  );
}
export default MobileNavBar;
