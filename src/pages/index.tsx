import React from "react";
import TeamOverview, { getServerSideProps } from "./team-overview";

export { getServerSideProps };

export default function Home(props: any) {
  return <TeamOverview {...props} />;
}
