import React from "react";
import { getClient } from "@/lib/graphql/apollo-client";
import { TeamStats } from "@/types/team";
import TeamStatsGrid from "@/components/TeamStatsGrid";
import ErrorMessage from "@/components/ErrorMessage";
import { useGlobalLoader } from "@/context/LoaderContext";
import { FilterType } from "@/types/employeeFilter";
import { handleExport } from "@/lib/utils/exportHandler";
import { TEAM_OVERVIEW } from "@/lib/graphql/queries";

export async function getServerSideProps() {
  const client = getClient();

  try {
    const { data } = await client.query({
      query: TEAM_OVERVIEW,
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
  const { setLoading } = useGlobalLoader();

  const handleCSVExport = async (filter: FilterType) => {
    const client = getClient();

    await handleExport(
      client,
      "EMPLOYEES",
      `team_${filter.toLowerCase()}`,
      setLoading,
      { filter }
    );
  };

  if (error || !teamStats) {
    return (
      <ErrorMessage message={error || "Failed to load team statistics."} />
    );
  }

  return <TeamStatsGrid onExport={handleCSVExport} stats={teamStats} />;
}
