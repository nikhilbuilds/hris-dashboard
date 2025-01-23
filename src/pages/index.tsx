import React from "react";
import TeamOverview, { getServerSideProps } from "./team-overview";

import { Stack } from "@mui/material";
export { getServerSideProps }; // Reuse getServerSideProps from Dashboard

export default function Home(props: any) {
  return <TeamOverview {...props} />;
}
