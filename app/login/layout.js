"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

import theme from "/assets/theme";

import MDBox from "/components/MDBox";

import routes from "/routes";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

export default function LoginLayout({ children }) {
  return children;
}
