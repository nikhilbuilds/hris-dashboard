import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

const drawerWidth = 50;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const menuItems = [
    { text: "Team Overview", path: "/team-overview" },
    { text: "Employees on Leave", path: "/employees-on-leave" },
    { text: "Birthdays", path: "/birthdays" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f4f4",
          p: 4,
          margin: `${drawerWidth}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
