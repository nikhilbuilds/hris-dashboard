import React from "react";
import Grid2 from "@mui/material/Grid2";
import StatCard from "@/components/StatCard";
import { TeamStats } from "@/types/team";

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
    <Grid2
      container
      spacing={3}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {statsArray.map((stat) => (
        <Grid2 key={stat.title}>
          <StatCard title={stat.title} value={stat.value} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default TeamStatsGrid;
