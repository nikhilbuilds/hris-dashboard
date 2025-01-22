import Grid from "@mui/material/Grid2";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function TeamOverview() {
  const teamStats = {
    totalEmployees: 100,
    activeEmployees: 85,
    employeesOnLeave: 15,
  };

  const stats = [
    { title: "Total Employees", value: teamStats.totalEmployees },
    { title: "Active Employees", value: teamStats.activeEmployees },
    { title: "Employees on Leave", value: teamStats.employeesOnLeave },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid key={stat.title}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              backgroundColor: "#1976d2",
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
        </Grid>
      ))}
    </Grid>
  );
}
