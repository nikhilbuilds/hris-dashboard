import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: number;
  exportButton: () => Promise<void>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  exportButton: handleExport,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        backgroundColor: "#24212175",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          {value}
        </Typography>
      </CardContent>
      <Button onClick={handleExport}>Export</Button>
    </Card>
  );
};

export default StatCard;
