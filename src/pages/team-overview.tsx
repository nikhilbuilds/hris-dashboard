import React from "react";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { TeamStats } from "@/types/team";
import TeamStatsGrid from "@/components/TeamStatsGrid";
import ErrorMessage from "@/components/ErrorMessage";

const GET_TEAM_OVERVIEW = gql`
  query TeamOverview {
    teamOverview {
      totalEmployees
      activeEmployees
      employeesOnLeave
    }
  }
`;

export async function getServerSideProps() {
  const client = getClient();

  try {
    const { data } = await client.query({
      query: GET_TEAM_OVERVIEW,
    });

    return {
      props: {
        teamStats: data.teamOverview,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        teamStats: null,
        error: "Failed to fetch team statistics.",
      },
    };
  }
}

interface DashboardProps {
  teamStats: TeamStats | null;
  error?: string;
}

export default function TeamOverview({ teamStats, error }: DashboardProps) {
  if (error || !teamStats) {
    return (
      <ErrorMessage message={error || "Failed to load team statistics."} />
    );
  }

  return <TeamStatsGrid stats={teamStats} />;
}
