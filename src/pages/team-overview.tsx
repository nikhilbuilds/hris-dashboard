import React from "react";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { TeamStats } from "@/types/team";
import TeamStatsGrid from "@/components/TeamStatsGrid";
import ErrorMessage from "@/components/ErrorMessage";
import { exportToCSV } from "@/lib/utils/exportCsv";
import { handleError } from "@/lib/utils/errorHandler";
import { useGlobalLoader } from "@/context/LoaderContext";
import { Employee } from "@/types/employee";
import { FilterType } from "@/types/employeeFilter";

const GET_TEAM_OVERVIEW = gql`
  query TeamOverview {
    teamOverview {
      totalEmployees
      activeEmployees
      employeesOnLeave
      departmentBreakdown {
        department
        count
      }
    }
  }
`;

const GET_TEAM_DATA = gql`
  query ExportTeamData($filter: String) {
    employees(filter: $filter) {
      id
      name
      department
      leaveType
      leaveStart
      leaveEnd
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
  const { setLoading } = useGlobalLoader();

  const handleExport = async (filter: FilterType) => {
    const client = getClient();
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_TEAM_DATA,
        variables: { filter },
      });

      let formattedData = data.employees.map((employee: Employee) => ({
        ID: employee.id,
        Name: employee.name,
        Department: employee.department,
        ...(filter === "ON_LEAVE" && {
          "Leave End": employee.leaveEnd,
          "Leave Start": employee.leaveStart,
          "Leave Type": employee.leaveType,
        }),
      }));

      exportToCSV(formattedData, `team_${filter.toLowerCase()}`);
    } catch (error) {
      console.error("Error exporting data:", error);
      handleError("Failed to export data");
    } finally {
      setLoading(false);
    }
  };

  if (error || !teamStats) {
    return (
      <ErrorMessage message={error || "Failed to load team statistics."} />
    );
  }

  return <TeamStatsGrid export={handleExport} stats={teamStats} />;
}
