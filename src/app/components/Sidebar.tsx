import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
} from "@mui/material";
import Link from "next/link";

export const Sidebar = () => {
  const menuItems = [
    { text: "Team Overview", path: "/dashboard" },
    { text: "Employees on Leave", path: "/employees-on-leave" },
    { text: "Birthdays", path: "/birthdays" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ padding: "16px", fontWeight: "bold", color: "#333" }}
      >
        HRIS Dashboard
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} sx={{ padding: "10px 16px" }}>
            <Link href={item.path} passHref>
              <ListItemText
                primary={item.text}
                sx={{
                  color: "#333",
                  "&:hover": {
                    color: "#1976d2",
                  },
                }}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
