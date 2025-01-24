import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
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
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </Typography>
        <Typography variant="h4" sx={{ marginTop: "8px", textAlign: "center" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
