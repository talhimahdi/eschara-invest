"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MDBox from "../../components/MDBox";
import colors from "../../assets/theme/base/colors";
import { Card, Typography } from "@mui/material";
import Image from "next/image";

export default function WaitingPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") router.push("/overview");
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
      <Card sx={{ p: 5, borderRadius: 1 }}>
        <MDBox sx={{ textAlign: "center", mb: 5 }}>
          <Image
            src={"/images/logo/logo-blue.svg"}
            alt="logo"
            width={300}
            height={30}
          />
        </MDBox>
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            gap: 2,
            px: 5,
          }}
        >
          <Typography variant="h4" color={colors.escharaThemeSecondary.main}>
            Account not yet activated.
          </Typography>
          <Typography
            variant="h6"
            color={colors.escharaThemePrimary.main}
            maxWidth={500}
          >
            We are now reviewing your account and we will soon activate it. You
            will receive an email upon activation.
          </Typography>
        </MDBox>
      </Card>
    </MDBox>
  );
}
