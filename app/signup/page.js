"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import MDBox from "../../components/MDBox";
import colors from "../../assets/theme/base/colors";

export default function Signup() {
  const session = useSession();
  const router = useRouter();

  const [loginError, setLoginError] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (session.status === "authenticated") router.push("/opportunities/all");
  });

  return (
    <MDBox
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: colors.escharaThemePrimary.main,
      }}
    >
      Signup page
    </MDBox>
  );
}
