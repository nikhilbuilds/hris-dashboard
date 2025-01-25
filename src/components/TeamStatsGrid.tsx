import React from "react";
import Grid2 from "@mui/material/Grid2";
import StatCard from "@/components/StatCard";
import { TeamStats } from "@/types/team";
import { Typography } from "@mui/material";
import PageHeader from "./PageHeader";

interface TeamStatsGridProps {
  stats: TeamStats;
}

const TeamStatsGrid: React.FC<TeamStatsGridProps> = ({ stats }) => {
  const statsArray = [
    { title: "Total Employees", value: stats.totalEmployees },
    { title: "Active Employees", value: stats.activeEmployees },
    { title: "Employees on Leave", value: stats.employeesOnLeave },
  ];

  return (
    <>
    <PageHeader title="Team overview" />
  
      <Grid2
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {statsArray.map((stat) => (
          <Grid2 key={stat.title} size={{ xs: 12, md: 4, sm: 6 }}>
            <StatCard title={stat.title} value={stat.value} />
          </Grid2>
        ))}
      </Grid2>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 5 }}>
        Department breakdown
      </Typography>
      <Grid2
        container
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {stats.departmentBreakdown.map((data) => (
          <Grid2 key={data.department} size={{ xs: 12, md: 4, sm: 6 }}>
            <StatCard title={data.department} value={data.count} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default TeamStatsGrid;
