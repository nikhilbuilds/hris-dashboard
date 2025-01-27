import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface ExportButtonProps extends Omit<ButtonProps, "onClick"> {
  onClick: () => React.MouseEventHandler<HTMLButtonElement> | Promise<void> | void;
  variant?: "text" | "contained";
  label?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  onClick,
  variant = "text",
  label = "Export",
  ...props
}) => {
  const buttonStyles = {
    text: {
      color: "#BB86FC",
    },
    contained: {
      backgroundColor: "secondary.main",
      color: "common.white",
      "&:hover": {
        backgroundColor: "secondary.dark",
      },
    },
  };

  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={buttonStyles[variant]}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ExportButton; 