"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import colors from "../../../assets/theme/base/colors";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { Add, Remove } from "@mui/icons-material";

import { useMaterialUIController, setMiniSidenav } from "../../../context";

import mobileRoutes from "../../../routes/mobileRoutes";

function MobileNavBar() {
  const router = useRouter();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;

  const [value, setValue] = useState(0);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window?.innerWidth < 500)
      setMiniSidenav(dispatch, true);
  }, [pathname]);

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
        zIndex: 1201,
        p: 1,
        gap: 1,
        height: 80,
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: colors.escharaThemePrimary.main,

        boxShadow: "0px 1px 5px #FFFFFF",

        "& .MuiBottomNavigationAction-root": {
          color: colors.white.main,
          gap: 1,
        },
        "& .MuiBottomNavigationAction-label": {
          color: colors.white.main,
          fontSize: 12,
        },

        "& .Mui-selected": {
          color: colors.white.main + "!important",
          backgroundColor: "#434461",
          borderRadius: 2,
          fontSize: "12px !important",
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
