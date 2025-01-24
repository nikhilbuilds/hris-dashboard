import React from "react";
import { Typography, Grid2 } from "@mui/material";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <Grid2
      marginBottom={2}
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children && <div>{children}</div>}
    </Grid2>
  );
};

export default PageHeader;
