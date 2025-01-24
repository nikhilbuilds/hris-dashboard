import React from "react";
import { Typography } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Typography
      variant="h6"
      color="error"
      align="center"
      sx={{ marginTop: "20px" }}
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;
