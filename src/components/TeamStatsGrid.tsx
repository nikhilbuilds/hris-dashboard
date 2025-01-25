import React from "react";
import Grid2 from "@mui/material/Grid2";
import StatCard from "@/components/StatCard";
import { TeamStats } from "@/types/team";
import { Typography } from "@mui/material";
import PageHeader from "./PageHeader";
import { EmployeeFilter, FilterType } from "@/types/employeeFilter";

interface TeamStatsGridProps {
  stats: TeamStats;
  export: (filter: FilterType) => void;
}

const TeamStatsGrid: React.FC<TeamStatsGridProps> = ({
  stats,
  export: handleExport,
}) => {
  const statsArray = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      filter: EmployeeFilter.ALL,
    },
    {
      title: "Active Employees",
      value: stats.activeEmployees,
      filter: EmployeeFilter.ACTIVE,
    },
    {
      title: "Employees on Leave",
      value: stats.employeesOnLeave,
      filter: EmployeeFilter.ON_LEAVE,
    },
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
            <StatCard
              exportButton={() => handleExport(stat.filter)}
              title={stat.title}
              value={stat.value}
            />
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
            <StatCard
              exportButton={() => handleExport(`DEPARTMENT_${data.department}`)}
              title={data.department}
              value={data.count}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default TeamStatsGrid;
