import React from "react";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";

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
    console.log(data);
    return {
      props: {
        teamStats: data.teamOverview,
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
  teamStats: {
    totalEmployees: number;
    activeEmployees: number;
    employeesOnLeave: number;
  } | null;
  error?: string;
}

export default function TeamOverview({ teamStats, error }: DashboardProps) {
  if (error || !teamStats) {
    return (
      <Typography
        variant="h6"
        color="error"
        align="center"
        sx={{ marginTop: "20px" }}
      >
        {error || "Failed to load team statistics."}
      </Typography>
    );
  }

  const stats = [
    { title: "Total Employees", value: teamStats.totalEmployees },
    { title: "Active Employees", value: teamStats.activeEmployees },
    { title: "Employees on Leave", value: teamStats.employeesOnLeave },
  ];

  return (
    <Grid2
      container
      spacing={3}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {stats.map((stat) => (
        <Grid2 key={stat.title}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              backgroundColor: "#24212175",
              color: "white",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ marginTop: "8px" }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
